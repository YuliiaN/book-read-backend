const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const schemas = require("../../schemas/users");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validateBody(schemas.signupSchema), ctrl.signup);

router.post("/signin", validateBody(schemas.signinSchema), ctrl.signin);

router.post("/signout", authenticate, ctrl.signout);

// router.post('/verify')

// router.post('/verify/:verificationToken')

module.exports = router;
