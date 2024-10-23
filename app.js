const express = require("express");
const mongoose = require("mongoose");
const petModel = require("./models/petModel");
const petRouter = require("./routes/petRoutes");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/petfinder")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/images", express.static("images"));
app.use(express.json());
app.use("/pet", petRouter);

app.listen(PORT, () => {
  console.log(`Petfinder server is running on PORT ${PORT}`);
});
