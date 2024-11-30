const { Router } = require("express");
const {
  createPet,
  editPetInfo,
  findNearestPets,
  findRecentPets,
  findPetInfo,
  findFilteredPets,
} = require("../controllers/petControllers");

const petRouter = Router();

// pets route

petRouter.post("/", createPet);

petRouter.patch("/:id", editPetInfo);

petRouter.get("/near", findFilteredPets);

petRouter.get("/recent", findRecentPets);

petRouter.get("/info/:id", findPetInfo);

petRouter.get("/query", findFilteredPets);

module.exports = petRouter;
