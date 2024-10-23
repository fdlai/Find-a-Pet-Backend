const petModel = require("../models/petModel");

function createPet(req, res) {
  const {
    name,
    breed,
    sex,
    city,
    state,
    zipCode,
    size,
    characteristics,
    health,
    description,
    imageUrl,
  } = req.body;

  return petModel
    .create({
      name,
      breed,
      sex,
      city,
      state,
      zipCode,
      size,
      characteristics,
      health,
      description,
      imageUrl,
    })
    .then((pet) => {
      return res.status(201).json(pet);
    })
    .catch((err) => {
      return res.status(500).json(`${err} Could not create pet.`);
    });
}

function editPetInfo(req, res) {
  const { id } = req.params;
  const updatedPetInfo = {};
  Object.keys(req.body).forEach((key) => {
    const value = req.body[key];
    if (value !== undefined) {
      updatedPetInfo[key] = value;
    }
  });

  return petModel
    .findByIdAndUpdate(id, { $set: updatedPetInfo }, { new: true })
    .then((updatedPet) => res.status(200).json(updatedPet))
    .catch((err) => res.status(500).json(`${err} Could not edit pet info.`));
}

module.exports = { createPet, editPetInfo };
