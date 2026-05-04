import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await portfolioAPI.getSkills();
        setSkills(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  // Helper function to get category display name
  const getCategoryName = (category) => {
    const names = {
      'languages': 'Languages',
      'programming': 'Programming Languages',
      'technology': 'Technology',
      'non_technical': 'Non-Technical',
    };
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Helper function to get proficiency badge
  const getProficiencyBadge = (proficiency) => {
    const badges = {
      'beginner': '⭐',
      'intermediate': '⭐⭐',
      'advanced': '⭐⭐⭐',
      'expert': '👑',
    };
    return badges[proficiency] || '';
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="skills-section">
      <h2>Skills & Technologies</h2>
      <div className="skills-container">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="skill-category">
            <h3>{getCategoryName(category)}</h3>
            <div className="skill-tags">
              {categorySkills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="skill-tag"
                  style={{ 
                    backgroundColor: skill.color || '#e0e0e0',
                    color: '#fff'
                  }}
                  title={`${skill.name} - ${skill.proficiency}`}
                >
                  {skill.icon && <span className={skill.icon}></span>}
                  {skill.name}
                  {skill.proficiency && (
                    <span className="proficiency-badge">
                      {getProficiencyBadge(skill.proficiency)}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
