const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoanAnalysis = sequelize.define('LoanAnalysis', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  eligibility_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  loan_amount_eligible: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
  },
  revenue_stability: {
    type: DataTypes.INTEGER,
  },
  credit_behavior: {
    type: DataTypes.INTEGER,
  },
  business_age_score: {
    type: DataTypes.INTEGER,
  },
  documentation_readiness: {
    type: DataTypes.INTEGER,
  },
  recommendation: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'loan_analysis',
  timestamps: false,
});

module.exports = LoanAnalysis;
