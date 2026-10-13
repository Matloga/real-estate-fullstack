import React from "react";
import SearchFilters from "../components/SearchFilters";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleFilter = (filters) => {
    const params = new URLSearchParams(filters).toString();
    navigate(`/properties?${params}`);
  };
  return (
    <div style={{ padding: 16 }}>
      <h2>Find Your Dream Home</h2>
      <SearchFilters onFilter={handleFilter} />
    </div>
  );
}
