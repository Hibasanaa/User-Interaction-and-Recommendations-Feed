const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const router = express.Router();

router.get('/:id/profile', getUserProfile);

module.exports = router;
