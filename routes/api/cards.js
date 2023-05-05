const express = require("express");

const { validateBody, authenticate, isValidId } = require("../../middlewares");

const schemas = require("../../schemas/cards");

const ctrl = require("../../controllers/cards");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllCards);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addCard);

router.put(
  "/:cardId",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateCard
);

router.delete("/:cardId", authenticate, isValidId, ctrl.deleteCard);

router.patch(
  "/:cardId/completed",
  authenticate,
  isValidId,
  validateBody(schemas.completeSchema),
  ctrl.updateCompleteStatus
);

module.exports = router;
