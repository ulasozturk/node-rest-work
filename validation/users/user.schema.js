const joi = require("@hapi/joi");

const schema = {
  user: joi.object({
    name: joi.string().max(255).required(),
    gender: joi.string().valid("m", "f", "o").required().messages({
      "string.base": "Gender must be a string",
      "any.only": "Gender can only be one of ['m','f','o']",
    }),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(255).required().messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 6 characters.",
    }),
    phone: joi.string().required(),
  }),
};

module.exports = schema;
