const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AIInsight = sequelize.define('AIInsight', {
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
  insight_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('high', 'medium', 'low'),
    defaultValue: 'medium',
  },
  category: {
    type: DataTypes.STRING(100),
  },
  status: {
    type: DataTypes.ENUM('active', 'applied', 'ignored'),
    defaultValue: 'active',
  },
  impact_score: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'ai_insights',
  timestamps: false,
});

module.exports = AIInsight;
