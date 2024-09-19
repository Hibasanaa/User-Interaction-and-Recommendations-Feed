const express = require('express');
const { likeRecommendation, commentOnRecommendation, shareRecommendation } = require('../controllers/recommendationController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/:id/like', auth, likeRecommendation);
router.post('/:id/comment', auth, commentOnRecommendation);
router.post('/:id/share', auth, shareRecommendation);

module.exports = router;
router.get('/recommended', auth, getRecommendations);
