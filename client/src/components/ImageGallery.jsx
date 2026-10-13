import { useState } from 'react';

const PLACEHOLDER = 'https://via.placeholder.com/800x450?text=No+Image';

const ImageGallery = ({ images = [] }) => {
  const [active, setActive] = useState(0);
  const gallery = images.length ? images : [PLACEHOLDER];

  return (
    <div>
      <img
        src={gallery[active]}
        alt="Property"
        style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 8 }}
      />
      <div className="gallery" style={{ marginTop: '0.5rem' }}>
        {gallery.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setActive(index)}
            style={{ cursor: 'pointer', opacity: index === active ? 1 : 0.6 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
