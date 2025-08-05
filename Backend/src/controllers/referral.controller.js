const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createReferral = async (req, res) => {
  try {
    const { company, role, message, resumeUrl, linkedIn } = req.body;

    const referral = await prisma.referralRequest.create({
      data: {
        company,
        role,
        message,
        resumeUrl,
        linkedIn,
        status: 'open',
        userId: req.user.id
      }
    });

    res.status(201).json(referral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/referrals
exports.getAllReferrals = async (req, res) => {
  try {
    const referrals = await prisma.referralRequest.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            techStack: true
          }
        }
      }
    });

    res.json(referrals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/referrals/:id
exports.updateReferralStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.referralRequest.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
