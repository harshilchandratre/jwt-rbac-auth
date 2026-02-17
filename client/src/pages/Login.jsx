import React, { useState } from "react";
const Login = () => {
  console.log("render")
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    alert("submit")
    console.log("hello")
  };

  return (
    <div>
      <div>
        <h2>Welcome back</h2>
        <p>Sign in to continue</p>

        <form onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="password"
              required
            />
          </label>

          <button type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
