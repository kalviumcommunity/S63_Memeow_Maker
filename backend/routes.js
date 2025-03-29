const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const router = express.Router();
const Entity = require('./models/Entity');
const User = require('./models/User');

// ✅ Validation Middleware
const validateEntity = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Name should be between 3 and 50 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 200 }).withMessage('Description should be between 10 and 200 characters'),

  body('userId')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }
    next();
  }
];

// ✅ Get All Users (GET)
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
});

// ✅ Get Single User by ID (GET)
router.get('/users/:id',
  param('id').isInt().withMessage('Invalid user ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }

    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Error fetching user' });
    }
  }
);

// ✅ Create Entity (POST)
router.post('/entities', validateEntity, async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new entity
    const newEntity = await Entity.create({ name, description, userId });

    return res.status(201).json(newEntity);
  } catch (error) {
    console.error('Error adding entity:', error);
    return res.status(500).json({ message: 'Error adding entity' });
  }
});

// ✅ Get All Entities (GET)
router.get('/entities', async (req, res) => {
  const { userId } = req.query;

  try {
    let options = {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'name'] // Only include these user fields
        }
      ]
    };

    // Filter by userId if provided
    if (userId) {
      options.where = { created_by: userId };
    }

    const entities = await Entity.findAll(options);
    return res.status(200).json(entities);
  } catch (error) {
    console.error('Error fetching entities:', error);
    return res.status(500).json({ message: 'Error fetching entities' });
  }
});

// ✅ Get Single Entity by ID (GET)
router.get('/entities/:id',
  param('id').isInt().withMessage('Invalid entity ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }

    const { id } = req.params;
    try {
      const entity = await Entity.findByPk(id, {
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'name']
          }
        ]
      });
      
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

// ✅ Update Entity by ID (PUT)
router.put('/entities/:id', [
  param('id').isInt().withMessage('Invalid entity ID'),
  ...validateEntity
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  }

  const { id } = req.params;
  const { name, description, userId } = req.body;

  try {
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the entity
    const entity = await Entity.findByPk(id);
    if (!entity) {
      return res.status(404).json({ message: 'Entity not found' });
    }

    // Update the entity
    await entity.update({ name, description, userId });

    return res.status(200).json(entity);
  } catch (error) {
    console.error('Error updating entity:', error);
    return res.status(500).json({ message: 'Error updating entity' });
  }
});

// ✅ Delete Entity by ID (DELETE)
router.delete('/entities/:id',
  param('id').isInt().withMessage('Invalid entity ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }

    const { id } = req.params;
    try {
      const entity = await Entity.findByPk(id);
      if (!entity) {
        return res.status(404).json({ message: 'Entity not found' });
      }
      
      await entity.destroy();
      return res.status(200).json({ message: 'Entity deleted successfully' });
    } catch (error) {
      console.error('Error deleting entity:', error);
      return res.status(500).json({ message: 'Error deleting entity' });
    }
  }
);

// ✅ Get Entities by User ID (GET)
router.get('/users/:userId/entities',
  param('userId').isInt().withMessage('Invalid user ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }

    const { userId } = req.params;
    try {
      // Check if user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Get all entities for this user
      const entities = await Entity.findAll({
        where: { userId },
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'name']
          }
        ]
      });
      
      return res.status(200).json(entities);
    } catch (error) {
      console.error('Error fetching user entities:', error);
      return res.status(500).json({ message: 'Error fetching user entities' });
    }
  }
);

module.exports = router;