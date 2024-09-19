const User = require('../models/User');
const Recommendation = require('../models/Recommendation');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('followers', 'name');
    const likedRecommendations = await Recommendation.find({ likes: req.params.id });
    const comments = await Recommendation.find({ 'comments.user': req.params.id });

    res.status(200).json({
      user: {
        name: user.name,
        likedRecommendations,
        comments,
        followers: user.followers.length
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
