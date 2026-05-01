const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const User = require('../models/User');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Create project
router.post('/', auth, [
  body('name').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, description, members } = req.body;
  try {
    const project = new Project({
      name,
      description,
      admin: req.user.id,
      members: members || [req.user.id],
    });
    await project.save();

    // Add project to users
    await User.updateMany({ _id: { $in: project.members } }, { $push: { projects: project._id } });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all projects for user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user.id }).populate('admin members tasks');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project by id
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('admin members tasks');
    if (!project || !project.members.includes(req.user.id)) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || project.admin.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const { name, description, members } = req.body;
    project.name = name || project.name;
    project.description = description || project.description;
    project.members = members || project.members;
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || project.admin.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;