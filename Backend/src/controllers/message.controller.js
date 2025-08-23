const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      orderBy: { timestamp: 'desc' },
      include: {
        sender: { select: { name: true, role: true } },
        receiver: { select: { name: true, role: true } }
      }
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
