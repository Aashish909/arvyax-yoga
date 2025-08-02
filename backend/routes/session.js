const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');

// JWT middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
}

// Public: GET /sessions
router.get('/sessions', async (req, res) => {
  const sessions = await Session.find({ status: 'published' }).sort({ created_at: -1 });
  res.json(sessions);
});

// Public: GET /sessions/:id
router.get('/sessions/:id', async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, status: 'published' });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    console.error('Error fetching session:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected: GET /my-sessions
router.get('/my-sessions', auth, async (req, res) => {
  const sessions = await Session.find({ user_id: req.userId }).sort({ updated_at: -1 });
  res.json(sessions);
});

// Protected: GET /my-sessions/:id
router.get('/my-sessions/:id', auth, async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.userId });
  if (!session) return res.status(404).json({ message: 'Not found' });
  res.json(session);
});

// Protected: POST /my-sessions/save-draft
router.post('/my-sessions/save-draft', auth, async (req, res) => {
  const { 
    _id, 
    title, 
    description,
    tags, 
    duration,
    instructor_name,
    level
  } = req.body;
  
  let session;
  if (_id) {
    session = await Session.findOneAndUpdate(
      { _id, user_id: req.userId },
      { 
        title, 
        description,
        tags, 
        duration,
        instructor_name,
        level,
        status: 'draft', 
        updated_at: new Date() 
      },
      { new: true }
    );
  } else {
    session = new Session({ 
      user_id: req.userId, 
      title, 
      description,
      tags, 
      duration,
      instructor_name,
      level,
      status: 'draft' 
    });
    await session.save();
  }
  res.json(session);
});

// Protected: POST /my-sessions/publish
router.post('/my-sessions/publish', auth, async (req, res) => {
  const { 
    _id, 
    title, 
    description,
    tags, 
    duration,
    instructor_name,
    level
  } = req.body;
  
  let session;
  if (_id) {
    session = await Session.findOneAndUpdate(
      { _id, user_id: req.userId },
      { 
        title, 
        description,
        tags, 
        duration,
        instructor_name,
        level,
        status: 'published', 
        updated_at: new Date() 
      },
      { new: true }
    );
  } else {
    session = new Session({ 
      user_id: req.userId, 
      title, 
      description,
      tags, 
      duration,
      instructor_name,
      level,
      status: 'published' 
    });
    await session.save();
  }
  res.json(session);
});

module.exports = router;