const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// uses name, email, and password. name is not required
// route: /signup
function createUser(req, res) {
  const { name, email, password } = req.body;
  //if name is undefined, default "Username" will be used

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return userModel.create({ name, email, password });
    })
    .then((user) => {
      return res.status(201).json({ name: user.name, email: user.email });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(`Could not create user.`);
    });
}

module.exports = { createUser };
