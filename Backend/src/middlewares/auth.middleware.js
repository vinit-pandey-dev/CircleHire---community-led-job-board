const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ msg: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

exports.isAuthenticated = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  next();
};

exports.isProfessional = (req, res, next) => {
  if (req.user.role !== 'professional') {
    return res.status(403).json({ msg: "Only professionals allowed" });
  }
  next();
};