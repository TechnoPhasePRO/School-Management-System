const express = require('express');
const { login, register } = require('../mws/auth');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

module.exports = router;
