const express = require('express');
const { getPersonalizedFeed } = require('../controllers/feedController');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, getPersonalizedFeed);

module.exports = router;
