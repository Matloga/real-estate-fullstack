import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link> | <Link to="/properties">Properties</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/favorites">Favorites</Link> | <Link to="/agent-dashboard">Agent Dashboard</Link> | <Link to="/profile">Profile</Link>
    </nav>
  );
}
