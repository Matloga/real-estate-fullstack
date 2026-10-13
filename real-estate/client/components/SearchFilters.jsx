import React, { useState } from "react";

export default function SearchFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    type: "sale",
    propertyType: "house",
    furnished: "",
    readyToMove: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFilter) onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="search-filters" style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", marginBottom: 16 }}>
      <input name="location" placeholder="Location" value={filters.location} onChange={handleChange} />
      <input name="minPrice" type="number" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} />
      <input name="maxPrice" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} />
      <input name="bedrooms" type="number" placeholder="Bedrooms" value={filters.bedrooms} onChange={handleChange} />
      <input name="bathrooms" type="number" placeholder="Bathrooms" value={filters.bathrooms} onChange={handleChange} />
      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="sale">Sale</option>
        <option value="rent">Rent</option>
      </select>
      <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
        <option value="plot">Plot</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}
