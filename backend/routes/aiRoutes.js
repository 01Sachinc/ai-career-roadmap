const express = require('express');
const { generateRoadmap, getRecentRoadmaps } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Optional auth for generation, required for listing personal roadmaps
const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    return protect(req, res, next);
  }
  next();
};

router.post('/generate', optionalAuth, generateRoadmap);
router.get('/recent', protect, getRecentRoadmaps); // Only logged in users can see their history clearly

module.exports = router;
