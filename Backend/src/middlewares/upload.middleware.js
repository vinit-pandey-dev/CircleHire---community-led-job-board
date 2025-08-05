// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads/resumes";

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// File type filter (only PDF)
const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase() === ".pdf";
  const mimetype = file.mimetype === "application/pdf";

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const sanitizedName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${sanitizedName}`);
  },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;
