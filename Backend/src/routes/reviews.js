const express = require("express");
const router = express.Router();
const { protect, isAuthenticated } = require("../middlewares/auth.middleware");
const { createReview, getReviews } = require("../controllers/reviewController");

// POST /api/reviews
router.post("/", protect, isAuthenticated, createReview);

router.get("/", getReviews);

module.exports = router;
