const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route POST /api/products
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, quantity, price, category } = req.body;
    const newProduct = new Product({
      name,
      description,
      quantity,
      price,
      category,
      createdBy: req.user.id
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route GET /api/products
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route PUT /api/products/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ msg: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route DELETE /api/products/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });

    if (!deleted) return res.status(404).json({ msg: 'Product not found' });

    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
