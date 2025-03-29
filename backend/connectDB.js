const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Create a new Sequelize instance with SQLite connection details
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: console.log,
});

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite Database Connected');
    
    // Sync all models
    // Note: In production, you might want to use migrations instead
    // Use force: true to drop and recreate all tables
    await sequelize.sync({ force: true });
    console.log('✅ All models were synchronized successfully');
  } catch (error) {
    console.error('❌ SQLite Database Connection Error:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = { sequelize, connectDB };