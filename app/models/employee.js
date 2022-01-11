const mongoose = require("mongoose");

const Employee = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  contact: {
    type: Number,
    require: true,
    // validate: {
    //   validator: function (v) {
    //     return /d{11}/.test(v);
    //   },
    //   message: "{VALUE} is not a valid 10 digit number!",
    // },
  },
  address: String,
  description: String,
  experience: String,
  jobPosition: String,
  currentCompany: String,
  created: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("employee", Employee);
