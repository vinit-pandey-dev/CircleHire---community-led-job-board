const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const upload = require("../middlewares/upload.middleware");
const { getUserById } = require("../controllers/auth.controller");
const authController = require("../controllers/auth.controller");
const { getCurrentUser } = require('../controllers/auth.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post("/register", upload.single("resume"), authController.register);
router.get('/me', requireAuth, getCurrentUser);
router.get("/:id", getUserById);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
