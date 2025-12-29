import React, { useState } from "react";
import { api } from "../api";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    try {
      await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      window.location.href = "/"; 
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Page</h2>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
