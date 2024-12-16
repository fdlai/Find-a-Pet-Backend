const petModel = require("../models/petModel");

function createPet(req, res) {
  const {
    name,
    species,
    breed,
    sex,
    age,
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
      species,
      breed,
      sex,
      age,
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
      console.error(err);
      return res.status(500).json(`Could not create pet.`);
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
    .catch((err) => {
      console.error(err);
      return res.status(500).json(`Could not edit pet info.`);
    });
}

function findNearestPets(req, res) {
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
      console.error(err);
      return res.status(500).json(`Could not get pets.`);
    });
}

const findRecentPets = async (req, res) => {
  const number = parseInt(req.query.number) || 10;
  petModel
    .find({})
    .sort({ createdAt: -1 }) // Sort by most recent
    .limit(number)
    .then((pets) => {
      console.log(pets);
      return res.status(200).json(pets);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(`Could not get recent pets.`);
    });
};

function findPetInfo(req, res) {
  const { id } = req.params;
  petModel
    .findById(id)
    .orFail()
    .then((pet) => {
      return res.status(200).json(pet);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(`Could not find pet.`);
    });
}

function findFilteredPets(req, res) {
  const allowedFields = new Set([
    "name",
    "species",
    "breed",
    "sex",
    "age",
    "city",
    "state",
    "zipCode",
    "size",
    "characteristics",
    "health",
    "description",
    "imageUrl",
    "location",
  ]);

  const filteredQuery = Object.keys(req.query)
    .filter((key) => allowedFields.has(key))
    .reduce((obj, key) => {
      obj[key] = req.query[key];
      return obj;
    }, {});

  const { lng, lat, page, pageSize = 20 } = req.query;

  // Add geospatial sorting if lng and lat are provided
  const queryOptions =
    lng && lat
      ? {
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [lng, lat],
              },
              $maxDistance: 5000000,
            },
          },
        }
      : {};

  const finalQuery = { ...filteredQuery, ...queryOptions };

  petModel
    .find(finalQuery)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .orFail()
    .then((pets) => {
      return res.status(200).json(pets);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(`Could not find pets.`);
    });
}

module.exports = {
  createPet,
  editPetInfo,
  findNearestPets,
  findRecentPets,
  findPetInfo,
  findFilteredPets,
};
