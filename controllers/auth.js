const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { User } = require("../models/user");

const { SECRET_KEY, BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<p><a href="${BASE_URL}/api/auth/verify/${verificationToken}">Click here to verify account</a></p>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({ email });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const { verify } = user;

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  if (!verify) {
    throw HttpError(403, "Email is not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "18h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({ token, user: { email } });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(200).json({ message: "Logout success" });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({ message: "Success verification" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  // if (!email) {
  //   res.status(400).json({ message: "Missing required field email" });
  // }

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<p><a href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click here to verify account</a></p>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
