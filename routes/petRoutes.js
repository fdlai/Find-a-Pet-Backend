const { Router } = require("express");
const {
  createPet,
  editPetInfo,
  findNearestPets,
  findRecentPets,
  findPetInfo,
} = require("../controllers/petControllers");

const petRouter = Router();

// pets route

petRouter.post("/", createPet);

petRouter.patch("/:id", editPetInfo);

petRouter.get("/near", findNearestPets);

petRouter.get("/recent", findRecentPets);

petRouter.get("/info/:id", findPetInfo);

module.exports = petRouter;
