import * as dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken';
const tokenKey = process.env.TOKEN_KEY;
import bcrypt from "bcryptjs";
import userModel from '../models/userModel.js';


export class UserService {

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await userModel.findOne({ email: email })
      console.log(user);
      if (!user){
        res.status(400).send("User Not Found");

      }
      if (user && (await bcrypt.compare(password, user.password))) {
        try {
          const token = await jwt.sign(
            { user_id: user._id, email: user.email },
            tokenKey,
            {
              expiresIn: "2h",
            }
          );

          user.token = token;
          delete user.password
          res.set({
            'X-Auth-Token': token,
          })
          res.status(200).json(user);
        } catch (e) {
          console.log(e);
          res.status(400).send({
            errorMessage: "Invalid Credentials",
          });
        }

      }
      else {
        res.status(400).send({
          errorMessage: "Invalid Credentials",
        });
      }
    } catch (err) {
      res.status(500).send({
        errorMessage: err,
      })
    }
  };


  signup = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] });

    if (user) {
      res.status(400).send({
        errorMessage: "User Exists",
      });
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword)
    const query = {
      username: username,
      email: email,
      password: encryptedPassword
    };

    const newUser = new userModel(query);
    newUser.bookmarkedItineraries = [];
    let result = await newUser.save().then(newUser => {
      const token = jwt.sign(
        { user_id: newUser._id, email },
        tokenKey,
        {
          expiresIn: "2h",
        }
      );
      // save user token

      newUser.token = token;
      delete newUser.password
      res.status(200).json(newUser)
    })
      .catch(error => {
        console.log(error)
        res.status(400).send({
          errorMessage: error,
        })
      })
  };

  findUserByEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).send({
          error: "No user with this email has account with Trippy"
        });
      }
      return res.status(200).send(user);
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }

  findUserById = async (req, res) => {
    try {
      const { _id } = req.body;
      const user = await userModel.findOne({ _id });
      if (!user) {
        return res.status(400).send({
          error: "No user with this email has account with Trippy"
        });
      }
      return res.status(200).send(user);
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }


}
export default UserService;