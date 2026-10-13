import { Link } from 'react-router-dom';

const PLACEHOLDER = 'https://via.placeholder.com/400x250?text=Property';

const PropertyCard = ({ property }) => {
  return (
    <div className="card">
      <Link to={`/properties/${property._id}`}>
        <img src={property.images?.[0] || PLACEHOLDER} alt={property.title} />
        <div className="card-body">
          <h3>{property.title}</h3>
          <p>{property.city}</p>
          <strong>${property.price?.toLocaleString()}</strong>
          <p>
            {property.bedrooms} bd · {property.bathrooms} ba · {property.area} sqft
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
