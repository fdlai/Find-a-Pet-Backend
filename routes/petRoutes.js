const { Router } = require("express");
const petModel = require("../models/petModel");
const { createPet, editPetInfo } = require("../controllers/petControllers");

const petRouter = Router();

petRouter.post("/", createPet);

petRouter.patch("/:id", editPetInfo);

module.exports = petRouter;
