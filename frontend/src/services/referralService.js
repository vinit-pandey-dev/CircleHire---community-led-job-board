import API from './api';

export const referralService = {
  // Student: Request a referral
  createReferral: (referralData) => API.post('/referrals/create', referralData),
  
  // Professional: View all requests
  getProfessionalReferrals: () => API.get('/referrals/getReferrals'),
  
  // Professional: Accept/Reject
  updateReferralStatus: (id, status) => API.patch(`/referrals/${id}`, { status }),
  
  // Student: View their history
  getStudentReferrals: (studentId) => API.get(`/referrals/student/${studentId}`),
};