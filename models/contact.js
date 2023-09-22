const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(40)
    .message("Name must be a minimum of 2 and a maximum of 40 characters")
    .required(),
  email: Joi.string().email().message("Incorrect email format"),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .message("Incorrect phone format. Valid format: (xxx) xxx-xxxx"),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, updateFavoriteSchema };

// const Joi = require('@hapi/joi');

// const joiSchema = Joi.object({
//   a: Joi.string()
//     .min(2)
//     .max(10)
//     .required()
//     .messages({
//       'string.base': `"a" should be a type of 'text'`,
//       'string.empty': `"a" cannot be an empty field`,
//       'string.min': `"a" should have a minimum length of {#limit}`,
//       'any.required': `"a" is a required field`
//     })
// });

// const validationResult = joiSchema.validate({ a: 2 }, { abortEarly: false });
// console.log(validationResult.error); // expecting ValidationError: "a" should be a type of 'text'