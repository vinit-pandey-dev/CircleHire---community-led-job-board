const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const upload = require("../middlewares/upload.middleware");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", upload.single("resume"), authController.register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
