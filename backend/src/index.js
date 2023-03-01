require('dotenv').config();
const express = require('express');
const async = require("async");
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

const fs = require('fs')
const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)
// const jwt = require("jsonwebtoken");
// const tokenKey = process.env.TOKEN_KEY || 'cmpe280_jwt_token_key';
// const bcrypt = require("bcryptjs");


// const { uploadFile, getFileStream } = require('./s3');
const { getConnection } = require('./dbconfig/config');
// const blogModel = require("./models/blogPost.js");
// const commentModel = require("./models/comments.js");
// const userModel = require("./models/user.js");


const app = express();
var cors = require("cors");
// const { authMiddleware } = require('./authMiddleware');
// const blogPostModel = require('./models/blogPost.js');
app.use(cors());
app.use(express.json());

const port = 3001;

getConnection()
  .then(connection => {
    // console.log(connection);
  }).catch(error => {
    console.log(error);
  })

app.get("/", (req, res) => {
  res.json({
    response: "success"
  })
})
app.listen(port, () => console.log("[backend] listening on port " + port));