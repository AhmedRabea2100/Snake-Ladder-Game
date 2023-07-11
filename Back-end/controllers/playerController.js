const bcrypt = require("bcrypt");
const db = require("../models").player;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const { extractPlayerId } = require('../middleware/extractPlayerId')

// const extractPlayerId= function(token){
//   try {
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjg5MDY5OTA4LCJleHAiOjE3NzU0Njk5MDh9.J6YlDzZOEfkPo5jONp_taeb2MJPy_A8UM9pTg0j66qE";

//     if (token) {
//       const decodedToken = jwt.verify(token, process.env.secretKey);
//       const playerId = decodedToken.id;
//         console.log(playerId)
//       player.findByPk(playerId)
//         .then((foundPlayer) => {
//           if (foundPlayer) {
//             req.playerId = playerId;
//             console.log(playerId);
//             next();
//           } else {
//             // res.status(401).send('Invalid token');
//             console.log("invalid token")
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//           // res.status(500).send('Internal server error');
//         });
//     } else {
//       // res.status(401).send('Token not found');
//       console.log("token not found")
//     }
//   } catch (error) {
//     console.error(error);
//     // res.status(500).send('Internal server error');
//   }
// };

function decryptToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    return decoded.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}


// Assigning users to the variable User
const player = db;

// Generate a random integer ID
// const generateRandomId = () => {
//   const buffer = crypto.randomBytes(4);
//   return buffer.readUInt32BE(0);
// };

// signing a user up
// hashing users password before it's saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
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
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      // console.log("user", JSON.stringify(user, null, 2));
      // console.log(token);
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
        // {id}=decoded
        // if password matches with the one in the database
        // go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        // console.log("user", JSON.stringify(user, null, 2));
        // console.log(token);
        // send user data
        // console.log(extractPlayerId);
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

// const tokenExtraction={
  
// };


module.exports = {
  signup,
  login,
  decryptToken,
};