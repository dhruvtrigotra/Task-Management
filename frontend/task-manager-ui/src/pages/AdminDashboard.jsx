import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getRole } from "./auth";

export default function Dashboard() {

  const [role, setRole] = useState(getRole());
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const [taskTitle, setTaskTitle] = useState("");

  const nav = useNavigate();

  // ---------------- AUTH ----------------
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/", { replace: true });
    }
  }, [nav]);

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.clear();
    nav("/", { replace: true });
  };

   useEffect(() => {
    const syncAuth = () => {
      setRole(getRole());
    };
  
    window.addEventListener("storage", syncAuth);
    window.addEventListener("focus", syncAuth);
  
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("focus", syncAuth);
    };
  }, []);
  
  useEffect(() => {
    if (role) {
      loadProjects();
    }
  }, [role]);


  // ---------------- BACK BUTTON LOCK ----------------
  useEffect(() => {
    const handleBack = () => {
      logout();
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  // ---------------- LOAD PROJECTS ----------------
  const loadProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  // ---------------- LOAD TASKS ----------------
  const loadTasks = async (projectId) => {
    const res = await api.get(`/tasks/project/${projectId}`);
    setTasks(res.data);
    setSelectedProject(projectId);
  };

  // ---------------- CREATE PROJECT ----------------
  const createProject = async () => {
    if (!projectName.trim() || !projectDesc.trim()) return;

    await api.post("/projects", {
      name: projectName,
      description: projectDesc,
    });

    setProjectName("");
    setProjectDesc("");
    loadProjects();
  };

  //------------------ ADDING MEMBERS --------------------
  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  const addMember = async (projectId) => {
    await api.post(`/projects/${projectId}/members/${selectedUser}`);
    alert("Member added");
  };

  // ---------------- CREATE TASK ----------------
  const createTask = async () => {
    if (!taskTitle.trim() || !selectedProject) return;

    await api.post(`/tasks?projectId=${selectedProject}`, {
      title: taskTitle,
      description: "Task",
    });

    setTaskTitle("");
    loadTasks(selectedProject);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.brand}>TaskFlow</h2>

        <div style={styles.section}>
          <p style={styles.label}>Create Project</p>

          <input
            style={styles.input}
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <textarea
            style={styles.textarea}
            placeholder="Project description"
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
          />

          <button style={styles.primaryBtn} onClick={createProject}>
            + Create Project
          </button>
        </div>

        <div style={styles.projectList}>
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => loadTasks(p.id)}
              style={{
                ...styles.projectCard,
                background:
                  selectedProject === p.id
                    ? "linear-gradient(90deg,#7c3aed,#4f46e5)"
                    : "rgba(255,255,255,0.03)",
              }}
            >
              <div style={{ fontWeight: "600" }}>{p.name}</div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                {p.description}
              </div>
            </div>
          ))}
        </div>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <h2 style={styles.title}>Tasks Dashboard</h2>

        {/* ---------- ADD TASK ---------- */}
        {selectedProject && (
          <div style={styles.taskInputBox}>
            <input
              style={styles.input}
              placeholder="New task..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <button style={styles.greenBtn} onClick={createTask}>
              + Add Task
            </button>
          </div>
        )}

        {/* ---------- ADD MEMBER (NEW FEATURE) ---------- */}
        {selectedProject && (
          <div style={styles.memberBox}>
            <select
              style={styles.input}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.email}
                </option>
              ))}
            </select>

            <button
              style={styles.primaryBtn}
              onClick={() => addMember(selectedProject)}
            >
              + Add Member
            </button>
          </div>
        )}

        {/* ---------- TASKS ---------- */}
        <div style={styles.taskGrid}>
          {tasks.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No tasks yet</p>
          ) : (
            tasks.map((t) => (
              <div key={t.id} style={styles.taskCard}>
                <h3 style={styles.taskTitle}>{t.title}</h3>
                <p style={styles.taskDesc}>{t.description}</p>

                <span style={styles.status}>{t.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },

  memberBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    alignItems: "center",
  },

  textarea: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.3)",
    color: "white",
    outline: "none",
    resize: "none",
    height: "80px",
  },

  taskTitle: {
    fontSize: "16px",
    marginBottom: "6px",
    fontWeight: "600",
  },

  taskDesc: {
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "10px",
    lineHeight: "1.4",
  },
  wrapper: {
    display: "flex",
    height: "100vh",
    background: "radial-gradient(circle at top,#1a1446,#050816,#030712)",
    color: "white",
    fontFamily: "Inter",
  },

  sidebar: {
    width: "300px",
    padding: "20px",
    background: "rgba(15,23,42,0.7)",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  brand: {
    fontSize: "26px",
    fontWeight: "800",
    background: "linear-gradient(90deg,#a855f7,#6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  label: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.3)",
    color: "white",
    outline: "none",
  },

  primaryBtn: {
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#7c3aed,#4f46e5)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },

  logoutBtn: {
    marginTop: "auto",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid red",
    background: "transparent",
    color: "red",
    cursor: "pointer",
  },

  projectList: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
  },

  projectCard: {
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  title: {
    fontSize: "22px",
    marginBottom: "20px",
  },

  taskInputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  greenBtn: {
    padding: "10px 15px",
    borderRadius: "10px",
    border: "none",
    background: "#22c55e",
    cursor: "pointer",
    fontWeight: "600",
  },

  taskGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
    gap: "15px",
  },

  taskCard: {
    padding: "15px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  status: {
    display: "inline-block",
    marginTop: "10px",
    padding: "4px 10px",
    borderRadius: "6px",
    background: "#64748b",
    fontSize: "12px",
  },
};
