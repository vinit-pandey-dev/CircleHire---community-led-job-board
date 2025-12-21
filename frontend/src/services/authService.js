import API from './api';

export const authService = {
  // IMPORTANT: Backend uses upload.single("resume"), so we must use FormData
  register: (userData) => {
    // userData should be a FormData object containing 'resume', 'name', 'email', etc.
    return API.post('/auth/register', userData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateProfile: (userData) => {
  // userData can be FormData (if uploading new resume) or JSON
  return API.put('/auth/profile', userData); 
  // Note: Ensure your backend has a PUT /auth/profile route!
  },
  login: (credentials) => API.post('/auth/login', credentials),
  
  logout: () => API.post('/auth/logout'),
  
  // Use this for persisting login on page refresh
  getCurrentUser: () => API.get('/auth/me'),
  
  getUserById: (id) => API.get(`/auth/${id}`),
};