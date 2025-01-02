const express = require('express');
const router = express.Router();

router.use('/api', require('./studentRoutes'));
router.use('/api', require('./classroomRoutes'));
router.use('/api', require('./schoolRoutes'));

module.exports = router;