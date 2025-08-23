// controllers/job.controller.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createJob = async (req, res) => {
  try {
    console.log("Received job post request");
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);

    const {
      title, company, location, jobType,
      tags, description, applyLink,
      referralAvailable, referralContact
    } = req.body;

    if (!req.user || !req.user.id) {
      console.log("req.user or req.user.id missing");
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Enum mapping
    const jobTypeMap = {
      "fulltime": "FullTime",
      "full_time": "FullTime",
      "full time": "FullTime",
      "internship": "Internship",
      "remote": "Remote",
      "hybrid": "Hybrid",
      "onsite": "Onsite"
    };

    const normalizedJobType = jobTypeMap[jobType?.toLowerCase()] || jobType;

    const allowedJobTypes = ["FullTime", "Internship", "Remote", "Hybrid", "Onsite"];
    if (!allowedJobTypes.includes(normalizedJobType)) {
      return res.status(400).json({ error: "Invalid job type" });
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        jobType: normalizedJobType,
        tags,
        description,
        applyLink,
        referralAvailable,
        referralContact,
        postedBy: {
          connect: { id: req.user.id }, // Fixed from req.user.userId
        },
      },
    });

    console.log("✅ Job created:", job);
    res.status(201).json(job);
  } catch (err) {
    console.error("❌ Job post failed:", err);
    res.status(500).json({
      error: 'Internal server error in posting job',
      details: err.message,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        postedBy: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
    });

    res.set('Cache-Control', 'no-store'); // disable caching in dev

    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found' });
    }

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch jobs', 
      details: err.message 
    });
  }
};


exports.getJobById = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { postedBy: true },
    });

    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job by ID', details: err.message });
  }
};
