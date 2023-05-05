const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const datePattern = new Date().setHours(0, 0, 0, 0);

const cardSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["easy", "normal", "hard"],
      required: [true, "Set status for card"],
    },
    text: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: [true, "Set text for card"],
    },
    field: {
      type: String,
      enum: ["stuff", "family", "health", "learning", "leisure", "work"],
      required: [true, "Set field for card"],
    },
    date: {
      type: Date,
      min: datePattern,
      required: [true, "Set finish date for card"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

cardSchema.post("save", handleMongooseError);

const Card = model("card", cardSchema);

module.exports = Card;
