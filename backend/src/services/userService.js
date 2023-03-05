import * as dotenv from 'dotenv' 
dotenv.config()
import jwt from 'jsonwebtoken';
const tokenKey = process.env.TOKEN_KEY;
import bcrypt from "bcryptjs";
import userModel from '../models/userModel.js';


export class UserService {

	login = async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!(username && password)) {
              res.status(400).send("All input is required");
            }
            const user = await userModel.findOne({ username: username })
            // .populate("followers", ["username", "fname", "lname"])
            // .populate("following", ["username", "imgKey", "name"]);
        
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
     // console.log(username, email, password);
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
        }

}
export default UserService;