const express = require('express');
const router = express.Router();
const School = require('../models/School');
const schoolValidation = require('../validations/school');
const authorize = require('../mws/authorize');

router.get('/', authorize(['superadmin', 'school-admin']), async (req, res) => {
  try {
    const schools = await School.find();
    res.send(schools);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve schools' });
  }
});

router.get('/:id', authorize(['superadmin', 'school-admin']), async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).send({ error: 'School not found' });
    }
    res.send(school);
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve school' });
  }
});

router.post('/', authorize(['superadmin']), async (req, res) => {
  try {
    const { error } = schoolValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const school = new School(req.body);
    await school.save();
    res.send(school);
  } catch (err) {
    res.status(500).send({ error: 'Failed to create school' });
  }
});

router.put('/:id', authorize(['superadmin']), async (req, res) => {
  try {
    const { error } = schoolValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).send({ error: 'School not found' });
    }
    school.set(req.body);
    await school.save();
    res.send(school);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update school' });
  }
});

router.delete('/:id', authorize(['superadmin']), async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).send({ error: 'School not found' });
    }
    await School.deleteOne({ _id: req.params.id });
    res.send({ message: 'School deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete school' });
  }
});

module.exports = router;
