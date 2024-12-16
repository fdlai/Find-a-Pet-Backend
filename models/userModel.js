const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    default: "Username",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
