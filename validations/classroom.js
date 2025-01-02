const Joi = require('joi');

const classroomValidation = Joi.object({
  name: Joi.string().required().min(3).max(255),
  capacity: Joi.number().required().integer().min(1),
  resources: Joi.array().required().items(Joi.string().required().min(3).max(255)),
  schoolId: Joi.string().required()
});

module.exports = classroomValidation;