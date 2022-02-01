let express = require("express");
let router = express.Router();
let jobController = require("../controllers/jobs");
const auth = require("../../middleware/auth");

router.get("/getjobs", jobController.getJobs);
router.post("/addjob", jobController.addjobs);
router.delete("/delete", jobController.delete);
router.get("/jobById", jobController.getJobById);
router.put("/updatebyId", jobController.update);

module.exports = router;
