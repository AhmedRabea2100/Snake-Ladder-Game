const bcrypt = require("bcrypt");
const db = require("../models").player;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


function decryptToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    return decoded.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}


const player = db;

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

      // Validate that required values are provided
      if (!username || !password) {
        return res.send("Missing username or password")
      }
    

    const id = db.id // Generate random integer ID
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
      
      return res.send("Signup successful");
    }
  } catch (error) {
    console.log(error);
  }
};

// login authentication
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

      // Validate that required values are provided
      if (!username || !password) {
        return res.send("Missing username or password")
      }
    

    // find a user by their username
    const user = await player.findOne({
      where: {
        username: username,
      },
    });
    // console.log(user)
    // if username is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      // if password is the same
      // generate token with the user's id and the secretKey in the env file
      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        const ID=decryptToken(token);
        console.log(ID);

        return res.json({
          message: "Login successful",
          token: token,
          id: ID,
          username: username
        })
      } else {
        return res.send("Username and Password do not match");
      }
    } else {
      return res.send("Username does not exist");
    }
  } catch (error) {
    console.log(error);
  }
};

// const tokenExtraction={
  
// };


module.exports = {
  signup,
  login,
  decryptToken,
};