const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // to access dot env

const mongoConnect = require("./library/mongoDB");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var allowedDomains = [
  "https://agencyconnectin.herokuapp.com",
  "http://localhost:3000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log(origin);
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use("/", require("./routes/crud"));

const port = process.env.PORT || 4000;

// I want to first check if mongodb connection established and then connect to server.
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("in home");
});

mongoConnect
  .then((response) => {
    app.listen(port, () => {
      console.log(`MongoDb connected successfully`);
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to db`, err);
  });

// Three ways of writing function in Nodejs
// async await
// Promises => we will write where we need to create certain libraries or middle ware
// Again callback but promises using .then and .catch
