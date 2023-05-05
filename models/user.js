const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 8,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      unique: true,
      match: emailRegex,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
    },

    token: {
      type: String,
      default: null,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
  emailRegex,
};
