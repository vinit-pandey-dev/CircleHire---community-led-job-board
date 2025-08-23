const express = require('express');
const router = express.Router();

const { getMessages } = require('../controllers/message.controller');
const { protect, isAuthenticated } = require('../middlewares/auth.middleware');

router.get('/', protect, isAuthenticated, getMessages);

module.exports = router;
