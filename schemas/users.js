const Joi = require("joi");

const { emailRegex } = require("../models/user");

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(8).required(),
  email: Joi.string()
    .pattern(emailRegex)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  password: Joi.string().min(8).required(),
});

const signinSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  password: Joi.string().min(8).required(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
});

const schemas = {
  signupSchema,
  signinSchema,
  emailSchema,
};

module.exports = schemas;
