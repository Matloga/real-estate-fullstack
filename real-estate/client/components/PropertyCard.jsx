import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      {property?.images?.[0] && <img src={property.images[0]} alt={property.title} />}
      <h3>{property.title}</h3>
      <p>${Number(property.price).toLocaleString()}</p>
      <p>{property.location}</p>
      <p>{property.bedrooms} beds • {property.bathrooms || "-"} baths • {property.area || "-"} sq ft</p>
      <Link to={`/properties/${property._id}`}>View Details</Link>
    </div>
  );
}
