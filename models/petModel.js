const mongoose = require("mongoose");
const validator = require("validator");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  species: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 60,
    default: "Unknown",
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
  age: {
    type: String,
    required: true,
    enum: ["young", "adolescent", "adult", "senior"],
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
    type: String,
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
    validate: {
      validator: function (value) {
        // Validate only if the value is provided
        if (value === "http://localhost:3001/images/defaultImage.jpg") {
          return true;
        }
        return validator.isURL(value);
      },
      message: "You must enter a valid URL.",
    },
    default: "http://localhost:3001/images/defaultImage.jpg",
  },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a geospatial index on the location field
petSchema.index({ location: "2dsphere" });

const petModel = mongoose.model("pet", petSchema);

module.exports = petModel;
