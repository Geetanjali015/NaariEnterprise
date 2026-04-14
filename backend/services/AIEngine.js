const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const { Op } = require('sequelize');

class AIEngine {
  // Calculate Financial Health Score (0-100)
  static async calculateHealthScore(userId) {
    try {
      const transactions = await Transaction.findAll({
        where: { user_id: userId },
      });

      if (transactions.length === 0) {
        return { score: 0, label: 'Poor', reason: 'Insufficient data' };
      }

      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const profit = totalIncome - totalExpense;
      const profitMargin = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;

      // Income vs Expense Ratio (40 points)
      const ratioScore = Math.min(40, (profitMargin / 100) * 40);

      // Inventory Efficiency (30 points)
      const products = await Product.findAll({ where: { user_id: userId } });
      const totalStockValue = products.reduce((sum, p) => sum + p.stock * p.price, 0);
      const inventoryScore = Math.min(30, totalStockValue > 0 ? 30 : 0);

      // Transaction Consistency (20 points)
      const thisMonth = new Date();
      const lastMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() - 1);
      const monthlyTransactions = transactions.filter(
        t => new Date(t.date) >= lastMonth
      ).length;
      const consistencyScore = Math.min(20, (monthlyTransactions / 10) * 20);

      // Growth Trend (10 points)
      const growthScore = profitMargin > 0 ? 10 : 5;

      const totalScore = ratioScore + inventoryScore + consistencyScore + growthScore;

      let label = 'Poor';
      if (totalScore >= 80) label = 'Excellent';
      else if (totalScore >= 60) label = 'Good';
      else if (totalScore >= 40) label = 'Average';

      return {
        score: Math.round(totalScore),
        label,
        profitMargin: Math.round(profitMargin),
        ratioScore: Math.round(ratioScore),
        inventoryScore: Math.round(inventoryScore),
        consistencyScore: Math.round(consistencyScore),
      };
    } catch (error) {
      console.error('Error calculating health score:', error);
      return { score: 0, label: 'Error', reason: error.message };
    }
  }

  // Generate Business Insights
  static async generateInsights(userId) {
    const insights = [];

    try {
      const transactions = await Transaction.findAll({
        where: { user_id: userId },
      });

      const products = await Product.findAll({
        where: { user_id: userId },
      });

      if (transactions.length === 0) {
        return [];
      }

      // Calculate metrics
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const profit = totalIncome - totalExpense;
      const expenseRatio = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

      // Insight 1: Expense Tracking
      if (expenseRatio > 70) {
        insights.push({
          insight_type: 'expense',
          title: 'High Expenses Alert',
          description: `Your expenses are ${Math.round(expenseRatio)}% of income. Consider cost optimization.`,
          priority: 'high',
          category: 'Cost Optimization',
          impact_score: 85,
        });
      } else if (expenseRatio > 50) {
        insights.push({
          insight_type: 'expense',
          title: 'Monitor Expenses',
          description: `Expenses are at ${Math.round(expenseRatio)}% of income. Keep monitoring growth.`,
          priority: 'medium',
          category: 'Cost Optimization',
          impact_score: 60,
        });
      }

      // Insight 2: Revenue Trend
      if (profit > 0) {
        insights.push({
          insight_type: 'revenue',
          title: 'Positive Growth Trend',
          description: `Your business is profitable with ₹${Math.round(profit)} profit margin.`,
          priority: 'medium',
          category: 'Revenue Growth',
          impact_score: 75,
        });
      }

      // Insight 3: Inventory Management
      const lowStockProducts = products.filter(p => p.stock < p.minStock);
      if (lowStockProducts.length > 0) {
        insights.push({
          insight_type: 'inventory',
          title: 'Low Stock Alert',
          description: `${lowStockProducts.length} products are below minimum stock level.`,
          priority: 'high',
          category: 'Operations',
          impact_score: 70,
        });
      }

      // Insight 4: Top Performing Categories
      const expensesByCategory = {};
      transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
          expensesByCategory[t.category] =
            (expensesByCategory[t.category] || 0) + parseFloat(t.amount);
        });

      const topExpense = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0];
      if (topExpense && topExpense[1] > totalExpense * 0.3) {
        insights.push({
          insight_type: 'category',
          title: `High Spending in ${topExpense[0]}`,
          description: `${topExpense[0]} accounts for ${Math.round((topExpense[1] / totalExpense) * 100)}% of expenses.`,
          priority: 'medium',
          category: 'Cost Optimization',
          impact_score: 65,
        });
      }

      return insights;
    } catch (error) {
      console.error('Error generating insights:', error);
      return [];
    }
  }

  // Calculate Loan Eligibility
  static async calculateLoanEligibility(userId) {
    try {
      const transactions = await Transaction.findAll({
        where: { user_id: userId },
      });

      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const profit = totalIncome - totalExpense;
      const profitMargin = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;
      const monthlyRevenue = totalIncome / Math.max(1, transactions.length / 4);

      // Revenue Stability Score (0-35)
      const transactionVariance = transactions.length > 0 ? 25 : 5;
      const revenueStability = Math.min(35, transactionVariance);

      // Credit Behavior Score (0-25) - based on consistency
      const consistencyDays = transactions.length > 0 ? 25 : 0;
      const creditBehavior = Math.min(25, consistencyDays);

      // Business Age Score (0-20) - simulated
      const businessAgeScore = 20;

      // Documentation Readiness (0-20)
      const documentationReadiness = 15;

      // Calculate total eligibility score
      const eligibilityScore =
        revenueStability + creditBehavior + businessAgeScore + documentationReadiness;

      // Calculate eligible loan amount (3x monthly revenue, max 50L)
      const eligibleLoanAmount = Math.min(5000000, monthlyRevenue * 3);

      let recommendation = '';
      if (eligibilityScore >= 80) {
        recommendation =
          'You are eligible for loans up to ₹' +
          eligibleLoanAmount.toLocaleString() +
          '. Strong financial profile!';
      } else if (eligibilityScore >= 60) {
        recommendation =
          'Moderate eligibility. Consider improving revenue consistency for better terms.';
      } else {
        recommendation = 'Build more transaction history to improve eligibility.';
      }

      return {
        eligibility_score: Math.min(100, Math.round(eligibilityScore)),
        loan_amount_eligible: Math.round(eligibleLoanAmount),
        revenue_stability: Math.round(revenueStability),
        credit_behavior: Math.round(creditBehavior),
        business_age_score: businessAgeScore,
        documentation_readiness: documentationReadiness,
        monthly_revenue: Math.round(monthlyRevenue),
        recommendation,
      };
    } catch (error) {
      console.error('Error calculating loan eligibility:', error);
      return { eligibility_score: 0, recommendation: 'Unable to calculate eligibility' };
    }
  }

  // Generate Business Recommendations
  static async generateRecommendations(userId) {
    const recommendations = [];

    try {
      const transactions = await Transaction.findAll({
        where: { user_id: userId },
      });

      const products = await Product.findAll({
        where: { user_id: userId },
      });

      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      // Cost Optimization Recommendations
      if (totalExpense > totalIncome * 0.6) {
        recommendations.push({
          title: 'Optimize Operating Costs',
          category: 'Cost Optimization',
          priority: 'high',
          action: 'Review and negotiate with suppliers for better rates',
          impact: '10-15% cost reduction',
        });
      }

      // Revenue Growth Recommendations
      const highValueProducts = products.filter(p => p.price > 500).slice(0, 3);
      if (highValueProducts.length > 0) {
        recommendations.push({
          title: 'Focus on Premium Products',
          category: 'Revenue Growth',
          priority: 'high',
          action: `Scale production of your premium products: ${highValueProducts.map(p => p.name).join(', ')}`,
          impact: '20-30% revenue increase',
        });
      }

      // Inventory Recommendations
      const lowStockCount = products.filter(p => p.stock < p.minStock).length;
      if (lowStockCount > 0) {
        recommendations.push({
          title: 'Restock Low Inventory Items',
          category: 'Operations',
          priority: 'high',
          action: `${lowStockCount} items need restocking to avoid lost sales`,
          impact: 'Prevent 15-20% revenue loss',
        });
      }

      // Marketing Recommendations
      if (totalIncome < 100000) {
        recommendations.push({
          title: 'Increase Marketing Efforts',
          category: 'Revenue Growth',
          priority: 'medium',
          action: 'Allocate 5-10% of revenue to digital marketing',
          impact: '25-40% new customer acquisition',
        });
      }

      return recommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }
}

module.exports = AIEngine;
