import Joi from 'joi';

const validation = Joi.object({
  name: Joi.string().max(30).required(),
});

export default { validation };
