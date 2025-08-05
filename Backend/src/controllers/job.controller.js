// controllers/job.controller.js
const { PrismaClient } = require("@prisma/client");

exports.createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, tags, description, applyLink, referralAvailable, referralContact } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        jobType,
        tags,
        description,
        applyLink,
        referralAvailable,
        referralContact,
        postedBy: { connect: { id: req.user.id } },
      },
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post job', details: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { postedBy: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs', details: err.message });
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
