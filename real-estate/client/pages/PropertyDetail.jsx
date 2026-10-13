import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../services/properties";
import ImageGallery from "../components/ImageGallery";
import MapView from "../components/MapView";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getProperty(id).then((res) => setProperty(res.data)).catch(console.error);
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{property.title}</h2>
      <ImageGallery images={property.images || []} />
      <p>${Number(property.price).toLocaleString()} • {property.location}</p>
      <p>{property.bedrooms} beds • {property.bathrooms || "-"} baths • {property.area || "-"} sq ft</p>
      <p>{property.description}</p>
      {property.coordinates?.coordinates && (
        <MapView lat={property.coordinates.coordinates[1]} lng={property.coordinates.coordinates[0]} title={property.title} />
      )}
    </div>
  );
}
