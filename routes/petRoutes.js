const { Router } = require("express");
const {
  createPet,
  editPetInfo,
  findNearestPets,
  findRecentPets,
} = require("../controllers/petControllers");

const petRouter = Router();

petRouter.post("/", createPet);

petRouter.patch("/:id", editPetInfo);

petRouter.get("/near", findNearestPets);

petRouter.get("/recent", findRecentPets);

module.exports = petRouter;
