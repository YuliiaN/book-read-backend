const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { cardId } = req.params;
  if (!isValidObjectId(cardId)) {
    next(HttpError(400, `${cardId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
