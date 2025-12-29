import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ padding: "10px", background: "#f0f0f0" }}>
      <nav>
        <Link to="/" style={{ margin: "0 10px" }}>Main</Link>
        <Link to="/login" style={{ margin: "0 10px" }}>Login</Link>
        <Link to="/register" style={{ margin: "0 10px" }}>Register</Link>
        <Link to="/about" style={{ margin: "0 10px" }}>About</Link>
      </nav>
    </header>
  );
}

export default Header;