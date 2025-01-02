const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');
const classroomValidation = require('../validations/classroom');
const authorize = require('../mws/authorize');

router.get('/', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const filter = req.user.role === 'school-admin' ? { schoolId: req.user.schoolId } : {};
    const classrooms = await Classroom.find(filter);
    res.send(classrooms);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve classrooms' });
  }
});

router.get('/:id', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom || (req.user.role === 'school-admin' && classroom.schoolId.toString() !== req.user.schoolId)) {
      return res.status(403).send({ error: 'Access denied' });
    }
    res.send(classroom);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve classroom' });
  }
});

router.post('/', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const { error } = classroomValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    if (req.user.role === 'school-admin') {
      req.body.schoolId = req.user.schoolId; // Assign school ID for school-admin
    }
    const classroom = new Classroom(req.body);
    await classroom.save();
    res.send(classroom);
  } catch (err) {
    res.status(500).send({ error: 'Failed to create classroom' });
  }
});

router.put('/:id', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const { error } = classroomValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom || (req.user.role === 'school-admin' && classroom.schoolId.toString() !== req.user.schoolId)) {
      return res.status(403).send({ error: 'Access denied' });
    }
    classroom.set(req.body);
    await classroom.save();
    res.send(classroom);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update classroom' });
  }
});

router.delete('/:id', authorize(['school-admin', 'superadmin']), async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom || (req.user.role === 'school-admin' && classroom.schoolId.toString() !== req.user.schoolId)) {
      return res.status(403).send({ error: 'Access denied' });
    }
    await Classroom.deleteOne({ _id: req.params.id });
    res.send({ message: 'Classroom deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete classroom' });
  }
});

module.exports = router;
