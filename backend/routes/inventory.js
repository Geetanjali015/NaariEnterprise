const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Product = require('../models/Product');

// Get all products for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
    });
    
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new product
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, sku, category, stock, minStock, price, description } = req.body;
    
    const product = await Product.create({
      user_id: req.user.id,
      name,
      sku,
      category,
      stock: parseInt(stock),
      minStock: parseInt(minStock),
      price: parseFloat(price),
      description,
    });
    
    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get specific product
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      },
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update product
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, sku, category, stock, minStock, price, description } = req.body;
    
    const product = await Product.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      },
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.update({
      name,
      sku,
      category,
      stock: parseInt(stock),
      minStock: parseInt(minStock),
      price: parseFloat(price),
      description,
    });
    
    res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      },
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.destroy();
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
