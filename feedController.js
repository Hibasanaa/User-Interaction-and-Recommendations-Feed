exports.getPersonalizedFeed = async (req, res) => {
    try {
      const userPreferences = req.user.preferences || [];
      const recommendations = await Recommendation.find({ tags: { $in: userPreferences } })
        .populate('author', 'name')
        .limit(20)
        .sort({ date: -1 });
  
      res.status(200).json(recommendations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.getPersonalizedFeed = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      const userPreferences = req.user.preferences || [];
      const recommendations = await Recommendation.find({ tags: { $in: userPreferences } })
        .populate('author', 'name')
        .limit(limit)
        .skip(skip)
        .sort({ date: -1 });
  
      res.status(200).json(recommendations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  