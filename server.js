const express = require("express");
const routing = require("./app/routes");
require("dotenv").config();
// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
let cors = require("cors");

const bodyParser = require("body-parser");

// create express app
const app = express();

app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
app.use(routing.auth);
app.use(routing.employee);
app.use(routing.configs);
app.use(routing.JobDetails);
app.use(routing.Jobs);

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
