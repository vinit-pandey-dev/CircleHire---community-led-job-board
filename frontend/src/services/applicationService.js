import API from './api';

export const applicationService = {
  applyForJob: (jobId, applicationData) => {
    // applicationData should be a FormData object
    return API.post(`/applications/${jobId}`, applicationData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  // Get applications for a student
  getMyApplications: () => API.get('/applications/my-applications'),
};