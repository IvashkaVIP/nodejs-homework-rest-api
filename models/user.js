const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");
const Joi = require("joi");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
},{versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required()
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const schemas = {
    registerSchema, loginSchema
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}


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