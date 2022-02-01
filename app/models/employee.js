const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Employee = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  contact: {
    type: String,
    require: true,
  },
  address: String,
  description: String,
  experience: {
    type: Schema.Types.ObjectId,
    ref: "configs",
    autopopulate: true,
  },
  jobPosition: {
    type: Schema.Types.ObjectId,
    ref: "configs",
    autopopulate: true,
  },
  currentCompany: String,
  degree: String,
  university: {
    type: Schema.Types.ObjectId,
    ref: "configs",
    autopopulate: true,
  },
  city: { type: Schema.Types.ObjectId, ref: "configs", autopopulate: true },
  gender: String,
  file: {
    type: String,
  },
  created: { type: Date, default: Date.now() },
});

Employee.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("employee", Employee);
