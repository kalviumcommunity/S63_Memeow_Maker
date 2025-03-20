const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200,
  },
  created_by: {
    type: String, // Storing the user as a string (can store user ID if needed)
    required: true,
  }
}, { timestamps: true });

const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;
