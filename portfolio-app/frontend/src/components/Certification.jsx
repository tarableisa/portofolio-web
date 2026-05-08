import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

const Certification = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await portfolioAPI.getCertifications();
        setCertifications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching certifications:', err);
        setError('Failed to load certifications');
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = process.env.REACT_APP_API_URL 
      ? process.env.REACT_APP_API_URL.replace('/api', '') 
      : 'http://localhost:8000';
    return `${baseUrl}${imagePath}`;
  };

  if (loading) return <div className="loading">Loading certifications...</div>;
  if (error) return <div className="error">{error}</div>;
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="certifications-section">
      <h2>🏆 Certifications & Licenses</h2>
      <div className="certifications-container">
        {certifications.map((cert) => (
          <div 
            key={cert.id} 
            className="certification-card"
            onClick={() => setSelectedCertification(cert)}
          >
            <div className="certification-image">
              <img 
                src={getImageUrl(cert.image)} 
                alt={cert.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Certificate';
                }}
              />
            </div>
            <div className="certification-name">
              <h3>{cert.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal untuk menampilkan gambar full size */}
      {selectedCertification && (
        <div className="modal-overlay" onClick={() => setSelectedCertification(null)}>
          <div className="modal-content certification-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCertification(null)}>
              ×
            </button>
            <img 
              src={getImageUrl(selectedCertification.image)} 
              alt={selectedCertification.name}
              className="certification-modal-image"
            />
            <div className="certification-modal-title">
              <h3>{selectedCertification.name}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certification;
