import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await axios.post(
        `http://localhost:4000/api/auth/login`,
        credentials
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("userId", res.data.user._id);
      console.log("User ID:", res.data.user._id);
      localStorage.setItem("email", res.data.user.email);

      setMessage("✅ Login successful! Redirecting...");
      const role = res.data.user.role;

      if (role === "admin") {
        window.location.href = "/admin-dashboard";
      } else if (role === "author") {
        window.location.href = "/author-dashboard";
      } else {
        window.location.href = "/user-dashboard";
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "❌ Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login to BlogNest</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={credentials.role}
          onChange={handleChange}
          required
        >
          <option value="user">User</option>
          <option value="author">Author</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="register-redirect">
          Don’t have an account? <a href="/register">Register here</a>
        </p>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
