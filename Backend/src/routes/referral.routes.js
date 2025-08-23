const express = require('express');
const router = express.Router();

const {
  createReferral,
  getAllReferrals,
  updateReferralStatus,
  getStudentReferrals
} = require('../controllers/referral.controller');

const { protect, isAuthenticated, isProfessional } = require('../middlewares/auth.middleware');

router.post('/create', protect, isAuthenticated, createReferral);

router.get('/getReferrals', protect, isAuthenticated, isProfessional, getAllReferrals);
router.patch('/:id', protect, isAuthenticated, isProfessional, updateReferralStatus);
router.get('/student/:studentId',protect, getStudentReferrals);

module.exports = router;
