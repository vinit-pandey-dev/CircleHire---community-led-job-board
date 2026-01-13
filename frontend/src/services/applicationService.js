import API from './api';

export const applicationService = {
  applyForJob: (jobId, applicationData) => {
    return API.post(`/applications/${jobId}`, applicationData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  getMyApplications: () => API.get('/applications/my-applications'),
};