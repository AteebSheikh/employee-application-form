let express = require("express");
let router = express.Router();
let employeeController = require("../controllers/employee");
let uploadUserById = require("../models/employee");
let uploadVideo = require("../helpers/function");
const auth = require("../../middleware/auth");

router.post("/employee", uploadVideo, employeeController.create);
router.get("/employee", auth, employeeController.getData);
router.get("/employeeById", auth, employeeController.getUserById);
router.get("/file", auth, employeeController.fileGet);

module.exports = router;
