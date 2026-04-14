const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GovernmentScheme = sequelize.define('GovernmentScheme', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  loan_amount_min: {
    type: DataTypes.DECIMAL(10, 2),
  },
  loan_amount_max: {
    type: DataTypes.DECIMAL(10, 2),
  },
  interest_rate: {
    type: DataTypes.DECIMAL(5, 2),
  },
  eligibility_criteria: {
    type: DataTypes.TEXT,
  },
  business_types: {
    type: DataTypes.JSON,
  },
  revenue_range: {
    type: DataTypes.STRING(100),
  },
  url: {
    type: DataTypes.STRING(500),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'government_schemes',
  timestamps: false,
});

module.exports = GovernmentScheme;
