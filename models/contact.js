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
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
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
const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, updateFavoriteSchema };
