const express = require("express");
const User = require("../models/User");
const Router = express.Router();
var path = require("path");
const reader = require("xlsx");
const response = require("../response.json");
const jwt = require("jsonwebtoken");

Router.post("/uploadfile", async (req, res) => {
  console.log(req.headers);
  const buffer = Buffer.from(req.body.file.split(",")[1], "base64");
  const file = reader.read(buffer, { type: "buffer" });
  console.log(file);
  try {
    let data = [];
    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(rest_data);
  }
});

Router.post("/login", async (req, res, next) => {
  let request_data = req.body;
  try {
    let user = await User.create({
      email: request_data.userEmail,
      name: request_data.name,

      password: request_data.userPassword,
      createdBy: "login",
      
      createdAt: new Date().getTime(),
      updatedBy: "login",
      updatedAt: new Date().getTime(),
      
    });

    let jwtToken = await jwt.sign({ userId: user._id }, "asdf21212", {
      expiresIn: 144000,
    });
    return res.status(200).json({ data: jwtToken, message: response["200"] });
  } catch (err) {
    return res.status(500).json({ message: response["500"] });
  }
});

Router.get("/user", async (req, res, next) => {
  let token = req.headers.authorization || "";
  jwt.verify(token, "asdf21212", (err, data) => {
    if (err) {
      return res.status(410).json({ messsage: response["410"] });
    }
    return res.status(200).json({ data: data, message: response["200"] });
  });
});

// Create a put request

module.exports = Router;

//rest api
// 1.crud
// get
// post
// put
// delete
// insert --insertOne
