const mongoose = require("mongoose");
const validator = require("validator");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  breed: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 60,
    default: "Unknown",
  },
  sex: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  city: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 60,
  },
  state: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 60,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
    enum: ["small", "medium", "large"],
  },
  characteristics: {
    type: String,
    required: true,
    default: "No information",
    minLength: 2,
    maxLength: 500,
  },
  health: {
    type: String,
    required: true,
    default: "No information",
    minLength: 2,
    maxLength: 500,
  },
  description: {
    type: String,
    default: "No description available",
    minLength: 2,
    maxLength: 1500,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "You must enter a valid URL",
    },
    default: "http://localhost:3000/images/defaultImage.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const petModel = mongoose.model("pet", petSchema);

module.exports = petModel;
