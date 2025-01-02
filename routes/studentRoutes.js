const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const studentValidation = require('../validations/student');

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve students' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    res.send(student);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve student' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { error } = studentValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const student = new Student(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send({ error: 'Failed to create student' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error } = studentValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    student.set(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update student' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    await Student.deleteOne({ _id: req.params.id });
    res.send({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete student' });
  }
});

module.exports = router;