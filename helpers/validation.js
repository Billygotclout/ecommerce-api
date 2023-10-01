const joi = require("joi");

const userSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required().min(3),
});

module.exports = { userSchema };
