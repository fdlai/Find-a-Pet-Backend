const newsRouter = require("express").Router();
const { getNewsArticles } = require("../controllers/newsControllers");

// news route
newsRouter.get("/", getNewsArticles);

module.exports = newsRouter;
