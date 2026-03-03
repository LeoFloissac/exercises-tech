// Backend Data Modeling Exercise
//
// This code contains several data modeling issues to address.
// Look for problems related to:
// - Nested vs. flat data structures
// - Route organization
// - Data duplication
// - API consistency
//
// Your task is to refactor this code following proper data modeling principles
// from the Selego Style Guide. Consider the tradeoffs between different approaches.

// models/task.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  user_id: String,
  user_name: String,
  user_avatar: String
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'review', 'done'],
    default: 'todo'
  },
  createdBy: {
    user_id: String,
    name: String,
    email: String,
    avatar: String
  },
  assignedTo: {
    user_id: String,
    name: String,
    email: String,
    avatar: String
  },
  comments: [commentSchema],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

// controllers/taskController.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, status, user_id, priority, dueDate } = req.body;
    
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ok: false, error: 'USER_NOT_FOUND' });
    }
    
    const task = new Task({
      title,
      description,
      status,
      createdBy: {
        user_id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      priority,
      dueDate
    });
    
    await task.save();
    res.status(201).json({ok: true, data: task});
  } catch (error) {
    res.status(500).json({ok: false, code: SERVER_ERROR, error });
  }
});

// Assign task to user or add a comment to a task
router.put('/:id', async (req, res) => {
  try {
    
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ok: false, error: 'TASK_NOT_FOUND' });
    }

    // Assign task to creator user
    if (req.body?.creator_user_id) {
      const user = await User.findById(req.body.creator_user_id);
      if (!user) {
        return res.status(404).json({ok: false, error: 'USER_NOT_FOUND' });
      }
      task.assignedTo = {
        user_id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      };
    }

    // Add a comment to a task
    if (req.body?.comment && req.body?.comment_user_id && req.body?.comment_user_name && req.body?.comment_user_avatar) {
      const user = await User.findById(body.comment_user_id);
      if (!user) {
        return res.status(404).json({ok: false, error: 'USER_NOT_FOUND' });
      }
      const comment = new Comment({
        text: req.body.comment,
        user_id: req.body.comment_user_id,
        user_name: req.body.comment_user_name,
        user_avatar: req.body.comment_user_avatar
      });
      task.comments.push(comment);
    }


    task.updatedAt = Date.now();
    await task.save();
    res.status(200).json({ok: true, data: task});
  } catch (error) {
    res.status(500).json({ok: false, code: SERVER_ERROR, error });
  }
});

module.exports = router;