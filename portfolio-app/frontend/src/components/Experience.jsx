import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await portfolioAPI.getExperiences();
        setExperiences(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="experience-section">
      <h2>Experience</h2>
      <div className="experience-list">
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="experience-header">
              <h3>{exp.job_title}</h3>
              <span className="date">
                {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date)}
              </span>
            </div>
            <div className="experience-details">
              <p className="company">{exp.company}</p>
              <p className="location">{exp.location}</p>
              {exp.employment_type && (
                <span className="employment-type">{exp.employment_type}</span>
              )}
            </div>
            <p className="description">{exp.description}</p>
            
            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="achievements">
                {exp.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
