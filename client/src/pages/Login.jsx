import React, { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/useAuth.js"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      const res = await api.get("/auth/me");
      setUser(res.data.user);
      console.log(form);
    } catch (err) {
      console.error("Login Failed: ", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to continue</p>

        <form onSubmit={onSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.button}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, #f5f7ff 0%, #eef2ff 100%)",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
    background: "#fff",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 700,
  },
  subtitle: {
    marginTop: "6px",
    marginBottom: "20px",
    color: "#666",
    fontSize: "14px",
  },
  form: {
    display: "grid",
    gap: "14px",
  },
  label: {
    fontSize: "13px",
    color: "#333",
    display: "grid",
    gap: "6px",
  },
  input: {
    height: "42px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    padding: "0 12px",
    outline: "none",
  },
  button: {
    height: "44px",
    borderRadius: "10px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default Login;
