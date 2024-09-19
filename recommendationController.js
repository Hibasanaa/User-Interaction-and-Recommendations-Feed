const Recommendation = require('../models/Recommendation');

// Like a recommendation
exports.likeRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });

    if (recommendation.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'You already liked this recommendation' });
    }
    
    recommendation.likes.push(req.user.id);
    await recommendation.save();

    res.status(200).json({ message: 'Recommendation liked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Comment on a recommendation
exports.commentOnRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });

    const comment = { user: req.user.id, text: req.body.text, date: Date.now() };
    recommendation.comments.push(comment);
    await recommendation.save();

    res.status(200).json({ message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Share a recommendation
exports.shareRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });

    const sharedRecommendation = new Recommendation({
      ...recommendation._doc,
      sharedBy: req.user.id,
      date: Date.now(),
    });

    await sharedRecommendation.save();

    res.status(200).json({ message: 'Recommendation shared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getRecommendations = async (req, res) => {
    try {
      const userPreferences = req.user.preferences || [];
      const recommendations = await Recommendation.find({ tags: { $in: userPreferences } })
        .limit(10);
  
      res.status(200).json(recommendations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  