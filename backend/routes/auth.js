const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      phone,
      city,
      business_type,
      business_name,
      gst_number,
      year_founded,
      employees,
      address,
      description,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      city,
      business_type,
      business_name,
      gst_number,
      year_founded,
      employees,
      address,
      description,
    });

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret_key_here', {
      expiresIn: '7d',
    });

    // Prepare user response (without password)
    const userResponse = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      business_type: user.business_type,
      business_name: user.business_name,
      gst_number: user.gst_number,
      year_founded: user.year_founded,
      employees: user.employees,
      address: user.address,
      description: user.description,
    };

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret_key_here', {
      expiresIn: '7d',
    });

    // Prepare user response (without password)
    const userResponse = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      business_type: user.business_type,
      business_name: user.business_name,
      gst_number: user.gst_number,
      year_founded: user.year_founded,
      employees: user.employees,
      address: user.address,
      description: user.description,
    };

    res.json({
      message: 'Login successful',
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
