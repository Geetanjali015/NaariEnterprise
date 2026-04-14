const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Product = require('./models/Product');
const AIInsight = require('./models/AIInsight');
const LoanAnalysis = require('./models/LoanAnalysis');
const GrowthChecklist = require('./models/GrowthChecklist');
const GovernmentScheme = require('./models/GovernmentScheme');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transactions');
const inventoryRoutes = require('./routes/inventory');
const aiRoutes = require('./routes/ai');

const app = express();

// Middleware


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors()); 
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/ai', aiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Sync models
    await sequelize.sync({ alter: false });
    console.log('Database models synced');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
