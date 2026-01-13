import API from './api';

export const authService = {
  register: (userData) => {
   
    return API.post('/auth/register', userData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateProfile: (userData) => {

  return API.put('/auth/profile', userData); 

  },
  login: (credentials) => API.post('/auth/login', credentials),
  
  logout: () => API.post('/auth/logout'),
  
  getCurrentUser: () => API.get('/auth/me'),
  
  getUserById: (id) => API.get(`/auth/${id}`),
};