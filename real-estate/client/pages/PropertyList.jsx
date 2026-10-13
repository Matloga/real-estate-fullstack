import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProperties } from "../services/properties";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async (params = {}) => {
    try {
      const res = await getProperties(params);
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    fetchData(params);
  }, [searchParams]);

  const handleFilter = (filters) => {
    const clean = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== "" && v !== null));
    setSearchParams(clean);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Properties</h2>
      <SearchFilters onFilter={handleFilter} />
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
        {properties.map((p) => (
          <PropertyCard key={p._id} property={p} />
        ))}
      </div>
    </div>
  );
}
