import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getRole } from "./auth";

export default function Dashboard() {
  const [role, setRole] = useState(getRole());
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const nav = useNavigate();

  const pendingTasks = tasks.filter((t) => t.status !== "DONE");
  const completedTasks = tasks.filter((t) => t.status === "DONE");
  const totalTasks = tasks.length;
  const pendingCount = pendingTasks.length;
  const doneCount = completedTasks.length;

  // ---------------- AUTH CHECK ----------------
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

  // ---------------- BACK BUTTON = AUTO LOGOUT ----------------
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {
      logout();
    };

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

  // ---------------- INIT ----------------
  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div>
          <h2 style={styles.brand}>TaskFlow</h2>

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
                {p.name}
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 LOGOUT FIXED AT BOTTOM */}
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <h2 style={styles.title}>Tasks</h2>

        <div style={styles.statsBox}>
          <div style={styles.statCard}>Total: {totalTasks}</div>
          <div style={styles.statCard}>Pending: {pendingCount}</div>
          <div style={styles.statCard}>Done: {doneCount}</div>
        </div>

        {/* CREATE TASK */}
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

        {/* TASK LIST */}
        <h3 style={{ marginTop: "20px" }}>Pending Tasks</h3>

        <div style={styles.taskGrid}>
          {pendingTasks.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No pending tasks</p>
          ) : (
            pendingTasks.map((t) => (
              <div key={t.id} style={styles.taskCard}>
                <h3 style={styles.taskTitle}>{t.title}</h3>
                <p style={styles.taskDesc}>{t.description}</p>

                <span style={{ ...styles.status, background: "#f59e0b" }}>
                  {t.status}
                </span>

                {/* MEMBER CAN UPDATE STATUS */}
                <div style={styles.actions}>
                  <button
                    style={styles.btnBlue}
                    onClick={async () => {
                      await api.put(`/tasks/${t.id}/status?status=IN_PROGRESS`);
                      loadTasks(selectedProject);
                    }}
                  >
                    Start
                  </button>

                  <button
                    style={styles.btnGreen}
                    onClick={async () => {
                      await api.put(`/tasks/${t.id}/status?status=DONE`);
                      loadTasks(selectedProject);
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <h3 style={{ marginTop: "30px" }}>Completed Tasks</h3>

        <div style={styles.taskGrid}>
          {completedTasks.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No completed tasks</p>
          ) : (
            completedTasks.map((t) => (
              <div key={t.id} style={styles.taskCard}>
                <h3 style={styles.taskTitle}>{t.title}</h3>
                <p style={styles.taskDesc}>{t.description}</p>

                <span style={{ ...styles.status, background: "#22c55e" }}>
                  DONE
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    background:
      "radial-gradient(circle at top, #1a1446 0%, #050816 60%, #030712 100%)",
    color: "white",
    fontFamily: "Inter",
  },

  statsBox: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },

  statCard: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.05)",
    textAlign: "center",
    fontWeight: "600",
  },

  sidebar: {
    width: "280px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "rgba(15,23,42,0.6)",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    padding: "20px",
  },

  projectList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",

    flex: 1, // takes remaining space
    overflowY: "auto", // scroll ONLY this section if needed
    paddingRight: "5px",
  },

  logoutBtn: {
    marginTop: "auto",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(239,68,68,0.4)",
    background: "rgba(239,68,68,0.08)",
    color: "#ef4444",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
  },

  brand: {
    fontSize: "26px",
    fontWeight: "800",
    background: "linear-gradient(90deg,#a855f7,#6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  sideText: {
    color: "#94a3b8",
    marginBottom: "15px",
  },

  taskInputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  projectCard: {
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
  },

  greenBtn: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg,#22c55e,#16a34a)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  title: {
    fontSize: "22px",
    marginBottom: "20px",
  },

  taskGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },

  taskCard: {
    background: "rgba(255,255,255,0.03)",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  status: {
    display: "inline-block",
    marginTop: "8px",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    background: "#64748b",
  },

  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "8px",
  },

  btnBlue: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#38bdf8",
    cursor: "pointer",
  },

  btnGreen: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#22c55e",
    cursor: "pointer",
  },

  btnRed: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#ef4444",
    cursor: "pointer",
  },
};
