import API from './api';

export const referralService = {

  createReferral: (referralData) => API.post('/referrals/create', referralData),

  getProfessionalReferrals: () => API.get('/referrals/getReferrals'),
  
  updateReferralStatus: (id, status) => API.patch(`/referrals/${id}`, { status }),
  
  getStudentReferrals: (studentId) => API.get(`/referrals/student/${studentId}`),
};