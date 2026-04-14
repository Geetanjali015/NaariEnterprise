const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  city: {
    type: DataTypes.STRING(50),
  },
  business_type: {
    type: DataTypes.STRING(50),
  },
  business_name: {
    type: DataTypes.STRING(100),
  },
  gst_number: {
    type: DataTypes.STRING(50),
  },
  year_founded: {
    type: DataTypes.INTEGER,
  },
  employees: {
    type: DataTypes.INTEGER,
  },
  address: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
