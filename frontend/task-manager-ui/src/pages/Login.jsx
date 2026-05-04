import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.data.role); // 🔥 MISSING PART FIXED

    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("role"));
    nav("/dashboard");
  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
    };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>

        <h1 style={styles.brand}>TaskFlow</h1>

        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Sign in to continue your workflow</p>

        <div style={styles.form}>

          <input
            style={styles.input}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.loginBtn} onClick={login}>
            Login
          </button>

          <div style={styles.divider}></div>

          <p style={styles.text}>Don’t have an account?</p>

          <button
            style={styles.signupBtn}
            onClick={() => nav("/signup")}
          >
            Create Account
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
  },

  brand: {
    fontSize: "30px",
    fontWeight: "900",
    background: "linear-gradient(90deg, #a855f7, #6366f1, #22d3ee)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "12px",
    letterSpacing: "1px",
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

  loginBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "800",
    cursor: "pointer",
    color: "white",
    background: "linear-gradient(90deg, #6366f1, #a855f7)",
    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.35)",
  },

  signupBtn: {
    width: "100%",
    padding: "11px",
    borderRadius: "12px",
    border: "1px solid rgba(139, 92, 246, 0.4)",
    background: "rgba(139, 92, 246, 0.05)",
    color: "#c4b5fd",
    cursor: "pointer",
  },

  text: {
    margin: "0",
    color: "#94a3b8",
    fontSize: "12px",
  },

  divider: {
    height: "1px",
    background: "rgba(139, 92, 246, 0.15)",
    margin: "6px 0",
  },
};
// const styles = {
//   wrapper: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #0f172a, #1e293b)",
//   },
//   brand: {
//   fontSize: "26px",
//   fontWeight: "700",
//   background: "linear-gradient(90deg, #38bdf8, #22c55e)",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   marginBottom: "8px",
//   letterSpacing: "1px",
// },

//   card: {
//     width: "350px",
//     padding: "30px",
//     borderRadius: "16px",
//     background: "#111827",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
//     textAlign: "center",
//   },

//   title: {
//     color: "white",
//     marginBottom: "5px",
//   },

//   subtitle: {
//     color: "#94a3b8",
//     marginBottom: "20px",
//     fontSize: "14px",
//   },

//   input: {
//     width: "100%",
//     padding: "12px",
//     margin: "10px 0",
//     borderRadius: "8px",
//     border: "1px solid #334155",
//     background: "#0f172a",
//     color: "white",
//     outline: "none",
//   },

//   loginBtn: {
//     width: "100%",
//     padding: "12px",
//     marginTop: "10px",
//     border: "none",
//     borderRadius: "8px",
//     background: "#38bdf8",
//     color: "black",
//     fontWeight: "bold",
//     cursor: "pointer",
//   },

//   signupBtn: {
//     width: "100%",
//     padding: "10px",
//     marginTop: "10px",
//     border: "1px solid #38bdf8",
//     borderRadius: "8px",
//     background: "transparent",
//     color: "#38bdf8",
//     cursor: "pointer",
//   },

//   text: {
//     marginTop: "15px",
//     color: "#94a3b8",
//     fontSize: "12px",
//   },
// };