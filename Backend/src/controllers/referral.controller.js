const { PrismaClient } = require('@prisma/client');
const sendEmail = require('../utils/sendEmail');
const prisma = new PrismaClient();

const ALLOWED_STATUSES = ['open', 'fulfilled', 'rejected'];

exports.createReferral = async (req, res) => {
  try {
    const { company, role, message, resumeUrl, linkedIn } = req.body;

    if (!company || !role) {
      return res.status(400).json({ error: 'Company and role are required.' });
    }

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

    return res.status(201).json({
      success: true,
      message: 'Referral request created successfully.',
      data: referral
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json({
      success: true,
      count: referrals.length,
      data: referrals
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getStudentReferrals = async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);

    const referrals = await prisma.referralRequest.findMany({
      where: {
        userId: studentId,
      },
      include: {
        user: {
          select: { name: true, email: true, techStack: true, role: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({
      success: true,
      count: referrals.length,
      data: referrals,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.updateReferralStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status before updating DB
    const allowedStatuses = ['open', 'fulfilled', 'rejected'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    // Update referral
    const referral = await prisma.referralRequest.update({
      where: { id: parseInt(id) },
      data: { status },
      include: { user: true }
    });

    // If fulfilled, send message + email
    if (status === 'fulfilled') {
      await prisma.message.create({
        data: {
          content: `Hi ${referral.user.name}, I've referred you for the ${referral.role} role at ${referral.company}. Best of luck!`,
          senderId: req.user.id,
          receiverId: referral.userId
        }
      });

      // Email notification
      try {
        await sendEmail({
          to: referral.user.email,
          subject: `🎉 You’ve been referred for ${referral.role} at ${referral.company}`,
          text: `Hi ${referral.user.name},\n\nGreat news! You've been referred for the ${referral.role} role at ${referral.company} by a professional.\n\nLog in to your dashboard to check the message and take next steps.\n\nGood luck!\n- ReferX Team`
        });
      } catch (emailError) {
        console.error("Email failed:", emailError.message);
        // Continue even if email fails
      }
    }

    res.json(referral);
  } catch (err) {
    console.error("Update referral error:", err);
    res.status(500).json({ error: err.message });
  }
};
