const fs = require("fs");
const JSONStream = require("JSONStream");
const axios = require("axios");
const throat = require("throat");

fs.createReadStream("./data/petData.json")
  .pipe(JSONStream.parse("*"))
  .on("data", (data) => {
    throat(3, async () => {
      try {
        const response = await axios.post("http://localhost:3001/pets", data);
        console.log(response.data);
        console.log("---------------------------------");
      } catch (error) {
        console.error(`${error} Could not create pet!`);
      }
    })();
  });
