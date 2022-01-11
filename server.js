const express = require("express");
const note = require("./app/routes/note.routes");
// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
var cors = require("cors");
var multer = require("multer");
var upload = multer();

const bodyParser = require("body-parser");

// create express app
const app = express();

app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(upload.array());

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
app.use(note);

// Require Notes routes
// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
