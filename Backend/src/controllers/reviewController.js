const express = require("express");
const router = express.Router();
const { protect, isAuthenticated } = require("../middlewares/auth.middleware");
const { createReview, getReviews } = require("./reviewController");

// POST /api/reviews
router.post("/", protect, isAuthenticated, createReview);

// GET /api/reviews?company=Amazon
router.get("/", getReviews);

module.exports = router;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// POST /api/reviews
exports.createReview = async (req, res) => {
  const { company, role, experience, difficulty, offerReceived, rating } = req.body;

  if (!company || !role || !experience || !difficulty || rating === undefined) {
    return res.status(400).json({ msg: "Please fill all required fields." });
  }

  try {
    const review = await prisma.companyReview.create({
      data: {
        company,
        role,
        experience,
        difficulty,
        offerReceived,
        rating,
        user: { connect: { id: req.user.userId } },
      },
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};

// GET /api/reviews?company=Amazon
exports.getReviews = async (req, res) => {
  const { company } = req.query;

  try {
    const filters = company ? { company: { contains: company, mode: "insensitive" } } : {};

    const reviews = await prisma.companyReview.findMany({
      where: filters,
      include: { user: { select: { name: true } } }, // Optional: Show reviewer name
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch reviews", error: err.message });
  }
};
