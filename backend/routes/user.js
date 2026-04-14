const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user without password
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

    res.json(userResponse);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const {
      full_name,
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

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only provided fields
    if (full_name !== undefined) user.full_name = full_name;
    if (phone !== undefined) user.phone = phone;
    if (city !== undefined) user.city = city;
    if (business_type !== undefined) user.business_type = business_type;
    if (business_name !== undefined) user.business_name = business_name;
    if (gst_number !== undefined) user.gst_number = gst_number;
    if (year_founded !== undefined) user.year_founded = year_founded;
    if (employees !== undefined) user.employees = employees;
    if (address !== undefined) user.address = address;
    if (description !== undefined) user.description = description;

    await user.save();

    // Return updated user without password
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
      message: 'Profile updated successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
