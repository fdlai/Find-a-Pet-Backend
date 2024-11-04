function findLocationByName(req, res) {
  const { query } = req.query;
  return fetch(
    `http://api.geonames.org/searchJSON?q=${query}&maxRows=5&country=US&username=${process.env.GEONAMES_USERNAME}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(`${err} could not find location(s).`);
    });
}

module.exports = { findLocationByName };
