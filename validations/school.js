const Joi = require('joi');

const schoolValidation = Joi.object({
  name: Joi.string().required().min(3).max(255),
  address: Joi.string().required().min(3).max(255),
  city: Joi.string().required().min(3).max(255),
  state: Joi.string().required().min(3).max(255),
  zip: Joi.string().required().min(3).max(255),
  country: Joi.string().required().min(3).max(255)
});

module.exports = schoolValidation;