import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await portfolioAPI.getProjects();
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000${imagePath}`;
  };

  return (
    <div className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {project.thumbnail && (
              <img 
                src={getImageUrl(project.thumbnail)}
                alt={project.title}
                className="project-thumbnail"
              />
            )}
            <div className="project-content">
              {project.subtitle && (
                <span className="project-subtitle">{project.subtitle}</span>
              )}
              <h3>{project.title}</h3>
              <p className="project-type">{project.project_type}</p>
              <p className="project-description">{project.description}</p>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech.id} className="tech-tag">
                      {tech.name}
                    </span>
                  ))}
                </div>
              )}
              
              {project.features && project.features.length > 0 && (
                <ul className="project-features">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
              
              <div className="project-links">
                {project.live_demo_url && (
                  <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {project.case_study_url && (
                  <a href={project.case_study_url} target="_blank" rel="noopener noreferrer">
                    Case Study
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
