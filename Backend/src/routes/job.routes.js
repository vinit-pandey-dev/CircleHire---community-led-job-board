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

router.post('/postjob', protect, isProfessional, createJob);
router.get('/getJobs', protect, getAllJobs);
router.get('/:id', getJobById);

module.exports = router;
