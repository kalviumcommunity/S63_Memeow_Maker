const { DataTypes } = require('sequelize');
const { sequelize } = require('../connectDB');
const User = require('./User');

const Entity = sequelize.define('Entity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [3, 50],
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: [10, 200],
      notEmpty: true,
    },
  },
  // The userId field will be automatically added by Sequelize
}, {
  timestamps: true,
});

// Define the relationship between Entity and User
Entity.belongsTo(User, {
  foreignKey: {
    name: 'userId', // This will be the column name in the Entity table
    allowNull: false,
    field: 'created_by', // This is the actual column name in the database
  },
  as: 'creator', // This is the alias for the association
});

// Define the reverse relationship
User.hasMany(Entity, {
  foreignKey: 'userId',
  as: 'entities',
});

module.exports = Entity;