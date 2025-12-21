import axios from 'axios';

// Change localhost:5000 to your backend port
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Automatically add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;