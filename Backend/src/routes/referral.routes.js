const express = require('express');
const router = express.Router();

const {
  createReferral,
  getAllReferrals,
  updateReferralStatus
} = require('../controllers/referral.controller');

const { protect, isAuthenticated, isProfessional } = require('../middlewares/auth.middleware');

router.post('/', protect, isAuthenticated, createReferral);

router.get('/', protect, isAuthenticated, isProfessional, getAllReferrals);
router.patch('/:id', protect, isAuthenticated, isProfessional, updateReferralStatus);

module.exports = router;
