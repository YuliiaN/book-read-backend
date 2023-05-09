const { HttpError, ctrlWrapper } = require("../helpers");

const Card = require("../models/card");

const getAllCards = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Card.find({ owner }).populate("owner", "username email");

  res.status(200).json(result);
};

const addCard = async (req, res) => {
  const { _id, username } = req.user;

  const newCard = { ...req.body, owner: { username, _id } };

  const existedCard = await Card.findOne(newCard);

  if (existedCard) {
    throw HttpError(409, "Already exists");
  }

  await Card.create(newCard);

  res.status(201).json(newCard);
};

const updateCard = async (req, res) => {
  const { cardId } = req.params;
  const { _id: owner } = req.user;

  const result = await Card.findOneAndUpdate({ _id: cardId, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Card not found");
  }

  res.status(200).json(result);
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  const { _id: owner } = req.user;

  const result = await Card.findOneAndRemove({ _id: cardId, owner });

  if (!result) {
    throw HttpError(404, "Card not found");
  }

  res.status(200).json({ cardId, message: "Card deleted" });
};

const updateCompletedStatus = async (req, res) => {
  const { cardId } = req.params;
  const { _id: owner } = req.user;

  const result = await Card.findOneAndUpdate({ _id: cardId, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Card not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getAllCards: ctrlWrapper(getAllCards),
  addCard: ctrlWrapper(addCard),
  updateCard: ctrlWrapper(updateCard),
  deleteCard: ctrlWrapper(deleteCard),
  updateCompletedStatus: ctrlWrapper(updateCompletedStatus),
};
