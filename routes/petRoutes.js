const { Router } = require("express");
const {
  createPet,
  editPetInfo,
  findPets,
} = require("../controllers/petControllers");

const petRouter = Router();

petRouter.post("/", createPet);

petRouter.patch("/:id", editPetInfo);

petRouter.get("/near", findPets);

module.exports = petRouter;
