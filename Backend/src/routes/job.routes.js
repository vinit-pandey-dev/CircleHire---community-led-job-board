const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById
} = require("../controllers/job.controller.js");

const {
  protect,
  isProfessional
} = require("../middlewares/auth.middleware.js");

const router = express.Router();

// Only PROFESSIONAL can post a job
router.post('/', protect, isProfessional, createJob);

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

module.exports = router;
