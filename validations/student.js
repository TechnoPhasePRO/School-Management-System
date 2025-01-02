const Joi = require('joi');

const studentValidation = Joi.object({
  name: Joi.string().required().min(3).max(255),
  email: Joi.string().required().email().min(3).max(255),
  phone: Joi.string().required().min(3).max(255),
  address: Joi.string().required().min(3).max(255),
  city: Joi.string().required().min(3).max(255),
  state: Joi.string().required().min(3).max(255),
  zip: Joi.string().required().min(3).max(255),
  country: Joi.string().required().min(3).max(255),
  schoolId: Joi.string().required(),
  classroomId: Joi.string().required()
});

module.exports = studentValidation;