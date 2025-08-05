const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      bio,
      linkedIn,
      techStack,
      college,
      graduationYear,
    } = req.body;

    const resume = req.file ? req.file.path : null;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    role,
    bio,
    linkedIn,
    techStack: techStack.split(",").map(item => item.trim()), 
    college,
    graduationYear: Number(graduationYear),
    resumeUrl: resume || null
  }
});

    res.status(201).json({ msg: "User registered", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.logout = async (req, res) => {
  // For JWT, logout is client-side (delete token on frontend)
  res.status(200).json({ msg: "Logout successful (client-side token removal)" });
};
