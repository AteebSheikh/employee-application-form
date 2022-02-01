let express = require("express");
let router = express.Router();
let users = require("../controllers/users");

router.post("/signup", users.signUp);
router.post("/signin", users.users);

module.exports = router;
