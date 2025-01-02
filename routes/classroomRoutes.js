const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');
const classroomValidation = require('../validations/classroom');

router.get('/', async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.send(classrooms);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve classrooms' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).send({ error: 'Classroom not found' });
    }
    res.send(classroom);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve classroom' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { error } = classroomValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const classroom = new Classroom(req.body);
    await classroom.save();
    res.send(classroom);
  } catch (err) {
    res.status(500).send({ error: 'Failed to create classroom' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error } = classroomValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).send({ error: 'Classroom not found' });
    }
    classroom.set(req.body);
    await classroom.save();
    res.send(classroom);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update classroom' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).send({ error: 'Classroom not found' });
    }
    await Classroom.deleteOne({ _id: req.params.id });
    res.send({ message: 'Classroom deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete classroom' });
  }
});

module.exports = router;