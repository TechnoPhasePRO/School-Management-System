const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const studentValidation = require('../validations/student');
const authorize = require('../mws/authorize');

router.get('/', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const filter = req.user.role === 'school-admin' ? { schoolId: req.user.schoolId } : {};
    const students = await Student.find(filter);
    res.send(students);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve students' });
  }
});

router.get('/:id', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student || (req.user.role === 'school-admin' && student.schoolId.toString() !== req.user.schoolId)) {
      return res.status(403).send({ error: 'Access denied' });
    }
    res.send(student);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve student' });
  }
});

router.post('/', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const { error } = studentValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    if (req.user.role === 'school-admin') {
      req.body.schoolId = req.user.schoolId; // Assign school ID for school-admin
    }
    const student = new Student(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send({ error: 'Failed to create student' });
  }
});

router.put('/:id', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const { error } = studentValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const student = await Student.findById(req.params.id);
    if (!student || (req.user.role === 'school-admin' && student.schoolId.toString() !== req.user.schoolId)) {
      return res.status(403).send({ error: 'Access denied' });
    }
    student.set(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update student' });
  }
});

router.delete('/:id', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student || (req.user.role === 'school-admin' && student.schoolId.toString() !== req.user.schoolId)) {
      return res.status(403).send({ error: 'Access denied' });
    }
    await Student.deleteOne({ _id: req.params.id });
    res.send({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete student' });
  }
});

module.exports = router;
