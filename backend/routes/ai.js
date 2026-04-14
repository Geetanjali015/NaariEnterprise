const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const AIEngine = require('../services/AIEngine');
const AIInsight = require('../models/AIInsight');
const LoanAnalysis = require('../models/LoanAnalysis');
const GrowthChecklist = require('../models/GrowthChecklist');
const GovernmentScheme = require('../models/GovernmentScheme');

// Get AI Dashboard Overview
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get health score
    const healthScore = await AIEngine.calculateHealthScore(userId);

    // Get insights count
    const insightsCount = await AIInsight.count({
      where: { user_id: userId, status: 'active' },
    });

    // Get active recommendations
    const recommendations = await AIEngine.generateRecommendations(userId);

    // Calculate growth potential
    const loanEligibility = await AIEngine.calculateLoanEligibility(userId);

    res.json({
      health_score: healthScore,
      active_insights: insightsCount,
      growth_potential: Math.round(healthScore.score / 2),
      loan_eligibility_score: loanEligibility.eligibility_score,
      recommendations_count: recommendations.length,
      key_metric:
        healthScore.label === 'Excellent'
          ? 'Your business is thriving!'
          : healthScore.label === 'Good'
          ? 'You are on track for growth'
          : 'Focus on improving profitability',
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get All Insights
router.get('/insights', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Generate fresh insights
    const newInsights = await AIEngine.generateInsights(userId);

    // Store or update insights
    for (const insight of newInsights) {
      await AIInsight.findOrCreate({
        where: {
          user_id: userId,
          insight_type: insight.insight_type,
          title: insight.title,
        },
        defaults: {
          ...insight,
          user_id: userId,
        },
      });
    }

    // Get all insights
    const insights = await AIInsight.findAll({
      where: { user_id: userId },
      order: [['priority', 'DESC'], ['created_at', 'DESC']],
    });

    res.json(insights);
  } catch (error) {
    console.error('Insights error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update Insight Status
router.put('/insights/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const insight = await AIInsight.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!insight) {
      return res.status(404).json({ message: 'Insight not found' });
    }

    await insight.update({ status });
    res.json({ message: 'Status updated', insight });
  } catch (error) {
    console.error('Update insight error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get Financial Health Score
router.get('/health-score', authMiddleware, async (req, res) => {
  try {
    const healthScore = await AIEngine.calculateHealthScore(req.user.id);
    res.json(healthScore);
  } catch (error) {
    console.error('Health score error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get Loan Eligibility
router.get('/loan-eligibility', authMiddleware, async (req, res) => {
  try {
    const eligibility = await AIEngine.calculateLoanEligibility(req.user.id);

    // Store analysis
    await LoanAnalysis.create({
      user_id: req.user.id,
      ...eligibility,
    });

    res.json(eligibility);
  } catch (error) {
    console.error('Loan eligibility error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get Recommendations
router.get('/recommendations', authMiddleware, async (req, res) => {
  try {
    const recommendations = await AIEngine.generateRecommendations(req.user.id);
    res.json(recommendations);
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get Growth Checklist
router.get('/checklist', authMiddleware, async (req, res) => {
  try {
    let checklist = await GrowthChecklist.findAll({
      where: { user_id: req.user.id },
      order: [['priority', 'DESC'], ['is_completed', 'ASC']],
    });

    // Create default checklist if empty
    if (checklist.length === 0) {
      const defaultTasks = [
        {
          task: 'Register your business legally',
          category: 'Legal',
          priority: 'high',
        },
        {
          task: 'Register for GST',
          category: 'Compliance',
          priority: 'high',
        },
        { task: 'Create business website', category: 'Digital', priority: 'medium' },
        {
          task: 'Set up social media presence',
          category: 'Digital',
          priority: 'medium',
        },
        { task: 'Open business bank account', category: 'Finance', priority: 'high' },
        {
          task: 'Track all financial transactions',
          category: 'Finance',
          priority: 'high',
        },
        {
          task: 'Build customer database',
          category: 'Operations',
          priority: 'medium',
        },
        {
          task: 'Create product/service catalog',
          category: 'Operations',
          priority: 'medium',
        },
      ];

      for (const task of defaultTasks) {
        await GrowthChecklist.create({
          user_id: req.user.id,
          ...task,
        });
      }

      checklist = await GrowthChecklist.findAll({
        where: { user_id: req.user.id },
        order: [['priority', 'DESC'], ['is_completed', 'ASC']],
      });
    }

    const completedCount = checklist.filter(c => c.is_completed).length;
    const progressPercentage = Math.round((completedCount / checklist.length) * 100);

    res.json({
      tasks: checklist,
      total: checklist.length,
      completed: completedCount,
      progress: progressPercentage,
    });
  } catch (error) {
    console.error('Checklist error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update Checklist Task
router.put('/checklist/:id', authMiddleware, async (req, res) => {
  try {
    const { is_completed } = req.body;
    const task = await GrowthChecklist.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.update({
      is_completed,
      completed_at: is_completed ? new Date() : null,
    });

    res.json({ message: 'Task updated', task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get Government Schemes
router.get('/schemes', authMiddleware, async (req, res) => {
  try {
    let schemes = await GovernmentScheme.findAll();

    // Seed schemes if empty
    if (schemes.length === 0) {
      const defaultSchemes = [
        {
          name: 'MUDRA Scheme',
          description: 'Micro Units Development and Refinance Agency lending scheme',
          loan_amount_min: 50000,
          loan_amount_max: 1000000,
          interest_rate: 8.5,
          business_types: ['retail', 'manufacturing', 'services'],
          revenue_range: 'Up to ₹25 lakhs',
          url: 'https://www.mudra.org.in',
        },
        {
          name: 'Stand-Up India',
          description: 'Scheme to facilitate bank loans to SC/ST and women entrepreneurs',
          loan_amount_min: 1000000,
          loan_amount_max: 10000000,
          interest_rate: 7.0,
          business_types: ['manufacturing', 'services', 'trade'],
          revenue_range: '₹10 lakhs to ₹1 crore',
          url: 'https://www.standupmitra.in',
        },
        {
          name: 'CGTMSE',
          description: 'Credit Guarantee Fund Trust for Micro and Small Enterprises',
          loan_amount_min: 0,
          loan_amount_max: 5000000,
          interest_rate: 6.5,
          business_types: ['manufacturing', 'services'],
          revenue_range: 'Up to ₹5 crores',
          url: 'https://www.cgtmse.in',
        },
        {
          name: 'PM-KUSUM',
          description: 'Pradhan Mantri Kisan Urja Suraksha Evam Utthaan Mahaabhiyaan',
          loan_amount_min: 500000,
          loan_amount_max: 50000000,
          interest_rate: 6.0,
          business_types: ['agriculture', 'renewable'],
          revenue_range: 'Variable',
          url: 'https://pmkusum.mnre.gov.in',
        },
      ];

      for (const scheme of defaultSchemes) {
        await GovernmentScheme.create(scheme);
      }

      schemes = await GovernmentScheme.findAll();
    }

    res.json(schemes);
  } catch (error) {
    console.error('Schemes error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
