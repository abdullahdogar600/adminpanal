const express = require('express');
const router = express.Router();
const Article = require('../models/article.model');
const { protect, authorize } = require('../middleware/auth.middleware');

// @route   GET /api/articles
// @desc    Get all articles
router.get('/', protect, async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('author', 'name email')
      .sort('-createdAt');
    
    res.status(200).json({
      status: 'success',
      results: articles.length,
      articles
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles' });
  }
});

// @route   POST /api/articles
// @desc    Create new article
router.post('/', protect, async (req, res) => {
  try {
    const article = await Article.create({
      ...req.body,
      author: req.user.id
    });

    res.status(201).json({
      status: 'success',
      article
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating article' });
  }
});

// @route   GET /api/articles/:id
// @desc    Get single article
router.get('/:id', protect, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name email');
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({
      status: 'success',
      article
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article' });
  }
});

// @route   PUT /api/articles/:id
// @desc    Update article
router.put('/:id', protect, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if user is the author
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this article' });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      article: updatedArticle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating article' });
  }
});

// @route   DELETE /api/articles/:id
// @desc    Delete article
router.delete('/:id', protect, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if user is the author
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this article' });
    }

    await article.remove();

    res.status(200).json({
      status: 'success',
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article' });
  }
});

module.exports = router; 