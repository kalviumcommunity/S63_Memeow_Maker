const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const Entity = require('./models/Entity'); 

// Middleware for validation
const validateEntity = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Name should be between 3 and 50 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 200 }).withMessage('Description should be between 10 and 200 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }
    next();
  }
];

// ✅ Create Entity (C)
router.post('/entities', validateEntity, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newEntity = new Entity({ name, description });
    await newEntity.save();
    return res.status(201).json(newEntity);
  } catch (error) {
    console.error('Error adding entity:', error);
    return res.status(500).json({ message: 'Error adding entity' });
  }
});

// ✅ Get All Entities (R)
router.get('/entities', async (req, res) => {
  try {
    const entities = await Entity.find();
    return res.status(200).json(entities);
  } catch (error) {
    console.error('Error fetching entities:', error);
    return res.status(500).json({ message: 'Error fetching entities' });
  }
});

// ✅ Get Single Entity by ID (R)
router.get('/entities/:id',
  param('id').isMongoId().withMessage('Invalid entity ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }

    const { id } = req.params;
    try {
      const entity = await Entity.findById(id);
      if (!entity) {
        return res.status(404).json({ message: 'Entity not found' });
      }
      return res.status(200).json(entity);
    } catch (error) {
      console.error('Error fetching entity:', error);
      return res.status(500).json({ message: 'Error fetching entity' });
    }
  }
);

// ✅ Update Entity by ID (U)
router.put('/entities/:id', [
  param('id').isMongoId().withMessage('Invalid entity ID'),
  ...validateEntity
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  }

  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedEntity = await Entity.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedEntity) {
      return res.status(404).json({ message: 'Entity not found' });
    }
    return res.status(200).json(updatedEntity);
  } catch (error) {
    console.error('Error updating entity:', error);
    return res.status(500).json({ message: 'Error updating entity' });
  }
});

// ✅ Delete Entity by ID (D)
router.delete('/entities/:id',
  param('id').isMongoId().withMessage('Invalid entity ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }

    const { id } = req.params;
    try {
      const deletedEntity = await Entity.findByIdAndDelete(id);
      if (!deletedEntity) {
        return res.status(404).json({ message: 'Entity not found' });
      }
      return res.status(200).json({ message: 'Entity deleted successfully' });
    } catch (error) {
      console.error('Error deleting entity:', error);
      return res.status(500).json({ message: 'Error deleting entity' });
    }
  }
);

module.exports = router;
