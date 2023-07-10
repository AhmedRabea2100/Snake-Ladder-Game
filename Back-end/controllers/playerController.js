const bcrypt = require("bcrypt");
const db = require("../models").player;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Assigning users to the variable User
const player = db;

// Generate a random integer ID
const generateRandomId = () => {
  const buffer = crypto.randomBytes(4);
  return buffer.readUInt32BE(0);
};

// signing a user up
// hashing users password before it's saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const id = generateRandomId(); // Generate random integer ID
    const data = {
      id,
      username,
      password: await bcrypt.hash(password, 10),
    };

    // saving the user
    const user = await player.create(data);

    // if user details are captured
    // generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      // send user's details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

// login authentication
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // find a user by their username
    const user = await player.findOne({
      where: {
        username: username,
      },
    });
    console.log(user)
    // if username is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      // if password is the same
      // generate token with the user's id and the secretKey in the env file
      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        // if password matches with the one in the database
        // go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        // send user data
        return res.status(201).send(user);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};