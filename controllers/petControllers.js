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
    location,
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
      location,
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

function findPets(req, res) {
  const { lng, lat } = req.query;

  petModel
    .find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 5000000,
        },
      },
    })
    .then((pets) => {
      console.log(pets);
      return res.status(200).json(pets);
    })
    .catch((err) => {
      console.error(`${err} Could not get pets.`);
      return res.status(500).json(`${err} Could not get pets.`);
    });
}

module.exports = { createPet, editPetInfo, findPets };
