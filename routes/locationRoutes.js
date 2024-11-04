const { Router } = require("express");
const { findLocationByName } = require("../controllers/locationControllers");

const locationRouter = Router();
// locations route

locationRouter.get("/", findLocationByName);

module.exports = locationRouter;
