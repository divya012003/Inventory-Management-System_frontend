const express = require('express');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add product to wishlist
router.post('/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const alreadyInWishlist = await Wishlist.findOne({ user: req.user.id, product: productId });
    if (alreadyInWishlist) return res.status(400).json({ msg: 'Already in wishlist' });

    const wishlistItem = new Wishlist({ user: req.user.id, product: productId });
    await wishlistItem.save();

    res.json(wishlistItem);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all wishlist items
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id }).populate('product');
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
    const removed = await Wishlist.findOneAndDelete({
      user: req.user.id,
      product: req.params.productId
    });

    if (!removed) return res.status(404).json({ msg: 'Item not found in wishlist' });

    res.json({ msg: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
