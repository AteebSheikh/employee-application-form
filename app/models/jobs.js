const mongoose = require("mongoose");

const Jobs = mongoose.Schema({
  jobName: { type: String, require: true },
  description: { type: String },
  education: { type: String },
  hours: { type: Number },
  jobType: { type: String },
  activeJob: { type: Boolean },
  formUrl: { type: String },
});

module.exports = mongoose.model("jobs", Jobs);
