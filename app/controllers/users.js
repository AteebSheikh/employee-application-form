const users = require("../models/user");
let jwt = require("jsonwebtoken");
exports.users = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body.email);

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await users.findOne({ email });
    if (user) {
      const token = await jwt.sign(
        { user_id: user._id, email },
        process.env.secretkey,
        {
          expiresIn: "2h",
        }
      );
      return res.status(200).json({ user, token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = new users({
    email: req.body.email,
    password: req.body.password,
  });
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  const oldUser = await users.findOne({ email });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  } else {
    let res = await user.save();
  }
};
