import API from './api';

export const jobService = {
  // Professional only
  postJob: (jobData) => API.post('/postjob', jobData),
  
  // Protected route (for students/pros)
  getAllJobs: () => API.get('/getJobs'),
  
  getJobById: (id) => API.get(`/jobs/${id}`),
};