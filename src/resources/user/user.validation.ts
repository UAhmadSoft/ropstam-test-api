import Joi from 'joi';

const signUp = Joi.object({
  firstName: Joi.string().max(30).required(),
  lastName: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
});

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const update = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  role: Joi.string(),
  email: Joi.string(),
});

export default { signUp, login, update };
