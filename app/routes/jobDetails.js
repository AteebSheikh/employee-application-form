let express = require("express");
let router = express.Router();
let jobDetialsController = require("../controllers/JobDetails");

router.get("/getJobById", jobDetialsController.JobDescription);

module.exports = router;
