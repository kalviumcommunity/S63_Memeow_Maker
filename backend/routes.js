const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Entity = require('./models/Entity');
const User = require('./models/User');

// ✅ Authentication Middleware
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ✅ Authentication Routes
// Register a new user
router.post('/auth/register', [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 50 }).withMessage('Username should be between 3 and 50 characters')
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { username: value } });
      if (existingUser) {
        throw new Error('Username already in use');
      }
      return true;
    }),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error('Email already in use');
      }
      return true;
    }),
  
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name should be between 2 and 100 characters'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  }

  try {
    const { username, email, name, password } = req.body;
    
    // Create new user
    const newUser = await User.create({
      username,
      email,
      name,
      password // Will be hashed by the beforeCreate hook
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Set token in cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Return user info (without password)
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      name: newUser.name
    };

    return res.status(201).json({ user: userResponse });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user' });
  }
});

// Login user
router.post('/auth/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  }

  try {
    const { username, password } = req.body;
    
    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Set token in cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    // Return user info (without password)
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name
    };
    
    return res.status(200).json({ user: userResponse });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Error logging in' });
  }
});

// Logout user
router.post('/auth/logout', (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({ message: 'Logged out successfully' });
});

// Get current user
router.get('/auth/me', authenticateToken, (req, res) => {
  const userResponse = {
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    name: req.user.name
  };
  
  return res.status(200).json({ user: userResponse });
});

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
router.post('/entities', authenticateToken, validateEntity, async (req, res) => {
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
router.put('/entities/:id', authenticateToken, [
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
router.delete('/entities/:id', authenticateToken,
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