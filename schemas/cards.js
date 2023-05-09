const Joi = require("joi").extend(require("@joi/date"));

const commonSchema = {
  status: Joi.string().valid("easy", "normal", "hard").required(),
  text: Joi.string().min(3).max(100).required(),
  field: Joi.string()
    .valid("stuff", "family", "health", "learning", "leisure", "work")
    .required(),
  date: Joi.date().format("YYYY-MM-DD HH:mm").utc().required(),
};

const addSchema = Joi.object(commonSchema);

const updateSchema = Joi.object(commonSchema);

const completedSchema = Joi.object({
  completed: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateSchema,
  completedSchema,
};
