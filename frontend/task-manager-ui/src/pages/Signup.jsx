import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [role, setRole] = useState("MEMBER");

  const signup = async () => {
    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });

      alert("Welcome to TaskFlow 🚀");
      nav("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.brand}>TaskFlow</h1>

        <h2 style={styles.title}>Create your account</h2>

        <p style={styles.subtitle}>
          Organize projects. Track tasks. Ship faster.
        </p>

        <div style={styles.form}>
          <input
            style={styles.input}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />

          <input
            style={styles.input}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <p style={styles.text}>Select Role</p>
          <select
            style={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="MEMBER">Member</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button style={styles.signupBtn} onClick={signup}>
            Create Account
          </button>

          <div style={styles.divider} />

          <p style={styles.text}>Already have an account?</p>

          <button style={styles.loginBtn} onClick={() => nav("/")}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #1a1446 0%, #050816 60%, #030712 100%)",
    fontFamily: "Inter, sans-serif",
  },

  card: {
    width: "420px",
    padding: "40px 36px",
    borderRadius: "20px",
    background: "rgba(15, 23, 42, 0.65)",
    border: "1px solid rgba(139, 92, 246, 0.25)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  brand: {
    fontSize: "30px",
    fontWeight: "900",
    background: "linear-gradient(90deg, #a855f7, #6366f1, #22d3ee)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1px",
    marginBottom: "12px",
    display: "block",
  },

  title: {
    color: "#e2e8f0",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "13px",
    marginBottom: "26px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(139, 92, 246, 0.2)",
    background: "rgba(2, 6, 23, 0.7)",
    color: "#e2e8f0",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },

  signupBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "800",
    cursor: "pointer",
    color: "white",
    background: "linear-gradient(90deg, #a855f7, #6366f1)",
    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.35)",
  },

  loginBtn: {
    width: "100%",
    padding: "11px",
    borderRadius: "12px",
    border: "1px solid rgba(99, 102, 241, 0.4)",
    background: "rgba(99, 102, 241, 0.05)",
    color: "#c4b5fd",
    cursor: "pointer",
  },

  text: {
    margin: "0",
    color: "#94a3b8",
    fontSize: "12px",
  },
};
