const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');
const { Op } = require('sequelize');

// Get transaction summary (total income, expenses, profit) - MUST BE BEFORE GET /:id
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const { month, year } = req.query;
    
    const where = { user_id: req.user.id };
    
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      where.date = {
        [Op.between]: [startDate, endDate]
      };
    }
    
    const incomeResult = await Transaction.findOne({
      attributes: [
        [require('sequelize').fn('SUM', require('sequelize').col('amount')), 'total']
      ],
      where: { ...where, type: 'income' },
    });
    
    const expenseResult = await Transaction.findOne({
      attributes: [
        [require('sequelize').fn('SUM', require('sequelize').col('amount')), 'total']
      ],
      where: { ...where, type: 'expense' },
    });
    
    const totalIncome = incomeResult.dataValues.total || 0;
    const totalExpense = expenseResult.dataValues.total || 0;
    const profit = totalIncome - totalExpense;
    
    res.json({
      totalIncome: parseFloat(totalIncome),
      totalExpense: parseFloat(totalExpense),
      profit: parseFloat(profit),
      margin: totalIncome > 0 ? ((profit / totalIncome) * 100).toFixed(2) : 0,
    });
  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all transactions for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { type, month, year } = req.query;
    
    const where = { user_id: req.user.id };
    
    if (type) {
      where.type = type;
    }
    
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      where.date = {
        [Op.between]: [startDate, endDate]
      };
    }
    
    const transactions = await Transaction.findAll({
      where,
      order: [['date', 'DESC']],
    });
    
    res.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new transaction
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    
    if (!type || !amount || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const transaction = await Transaction.create({
      user_id: req.user.id,
      type,
      amount,
      category,
      description,
      date: date || new Date(),
    });
    
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a specific transaction
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update a transaction
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    
    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    if (type) transaction.type = type;
    if (amount) transaction.amount = amount;
    if (category) transaction.category = category;
    if (description) transaction.description = description;
    if (date) transaction.date = date;
    
    await transaction.save();
    
    res.json({
      message: 'Transaction updated successfully',
      transaction,
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a transaction
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    await transaction.destroy();
    
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
