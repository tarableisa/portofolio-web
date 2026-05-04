import axios from 'axios';

// Base URL untuk Django backend
const API_BASE_URL = 'http://localhost:8000/api';

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
};

export default api;
