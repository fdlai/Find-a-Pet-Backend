const fs = require("fs");
const JSONStream = require("JSONStream");
const axios = require("axios");

fs.createReadStream("./data/petData.json")
  .pipe(JSONStream.parse("*"))
  .on("data", async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/pet", data);
      console.log(response);
      console.log("---------------------------------");
    } catch (error) {
      console.error(`${error} Could not create pet!`);
    }
  });
