import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyList from "./pages/PropertyList";
import PropertyDetail from "./pages/PropertyDetail";
import Favorites from "./pages/Favorites";
import AgentDashboard from "./pages/AgentDashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
