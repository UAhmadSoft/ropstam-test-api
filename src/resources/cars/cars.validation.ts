import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().max(30).required(),
  model: Joi.string().max(30).required(),
  color: Joi.string().max(30).required(),
  registrationNumber: Joi.string().max(8).required(),
  category: Joi.string().required(),
});

const update = Joi.object({
  name: Joi.string().max(30),
  model: Joi.string().max(30),
  color: Joi.string().max(30),
  registrationNumber: Joi.string().max(8),
  category: Joi.string(),
});

export default { create, update };
