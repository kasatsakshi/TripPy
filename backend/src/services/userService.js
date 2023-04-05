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

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, username: user.username },
          tokenKey,
          {
            expiresIn: "2h",
          }
        );

        user.token = token;
        res.status(200).json(user);
      }
      else if (!user) {
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      res.status(500).send(err)
    }
  };


  signup = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] });

    if (user) {
      res.status(400).send("User Exists");
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
        res.status(200).json(newUser)
    })
        .catch(error => {
        console.log(error)
        res.status(400).send(error)
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


}
export default UserService;