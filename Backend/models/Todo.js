const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", Todo); //should be capital
