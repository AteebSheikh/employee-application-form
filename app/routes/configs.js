let express = require("express");
let router = express.Router();
let configController = require("../controllers/configs");
const auth = require("../../middleware/auth");

router.get("/getconfigs", configController.getConfigs);
router.post("/configs", auth, configController.configs);

module.exports = router;
