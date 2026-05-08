import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await portfolioAPI.getCourses();
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    return `${baseUrl.replace('/api', '')}${imagePath}`;
  };

  const openModal = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <section id="courses" className="courses-section">
        <div className="loading">Loading courses...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="courses" className="courses-section">
        <div className="error">Error loading courses: {error}</div>
      </section>
    );
  }

  return (
    <>
      <section id="courses" className="courses-section">
        <h2>Courses & Training</h2>
        <div className="courses-container">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="course-card"
              onClick={() => openModal(course)}
            >
              {course.image && (
                <div className="course-image-container">
                  <img 
                    src={getImageUrl(course.image)} 
                    alt={course.course_name}
                    className="course-image"
                  />
                </div>
              )}
              <div className="course-info">
                <h3 className="course-name">{course.course_name}</h3>
                <div className="course-organization">{course.organization}</div>
                <span className="course-date">{formatDate(course.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Detail */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {selectedCourse.image && (
              <img 
                src={getImageUrl(selectedCourse.image)} 
                alt={selectedCourse.course_name}
                className="modal-image"
              />
            )}
            
            <div className="modal-body">
              <h2 className="modal-title">{selectedCourse.course_name}</h2>
              <div className="modal-meta">
                <span className="modal-organization">📚 {selectedCourse.organization}</span>
                <span className="modal-date">📅 {formatDate(selectedCourse.date)}</span>
              </div>
              <p className="modal-description">{selectedCourse.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Course;
