const Joi = require("joi").extend(require("@joi/date"));

const addSchema = Joi.object({
  status: Joi.string().valid("easy", "normal", "hard"),
  text: Joi.string().min(10).max(100).required(),
  field: Joi.string()
    .valid("stuff", "family", "health", "learning", "leisure", "work")
    .required(),
  date: Joi.date().format("YYYY-MM-DD HH:mm").utc().required(),
});

const updateSchema = Joi.object({
  status: Joi.string().valid("easy", "normal", "hard"),
  text: Joi.string().min(10).max(100).required(),
  field: Joi.string()
    .valid("stuff", "family", "health", "learning", "leisure", "work")
    .required(),
  date: Joi.date().format("YYYY-MM-DD HH:mm").utc().required(),
});

const completeSchema = Joi.object({
  completed: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateSchema,
  completeSchema,
};
