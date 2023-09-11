const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(40)
    .message("Name must be a minimum of 2 and a maximum of 40 characters")
    .required(),
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .message("Email should have the format example@email.com")
    .required(),
  phone: Joi.string()
    .min(2)
    .max(40)
    .message("Phone must be a minimum of 2 and a maximum of 40 characters")
    .required(),
});

module.exports = {
  addShema,
};
