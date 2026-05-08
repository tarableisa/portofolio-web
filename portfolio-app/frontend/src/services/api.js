import axios from 'axios';

// Base URL untuk Django backend
// Gunakan environment variable jika tersedia, fallback ke localhost untuk development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const portfolioAPI = {
  // Profile
  getProfile: () => api.get('/profile/'),
  
  // Social Links
  getSocialLinks: () => api.get('/social-links/'),
  
  // Experience
  getExperiences: () => api.get('/experiences/'),
  
  // Skills
  getSkills: () => api.get('/skills/'),
  
  // Projects
  getProjects: () => api.get('/projects/'),
  
  // Approaches
  getApproaches: () => api.get('/approaches/'),
  
  // Courses & Trainings
  getCourses: () => api.get('/courses/'),
  
  // Certifications
  getCertifications: () => api.get('/certifications/'),
};

export default api;
