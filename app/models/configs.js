const mongoose = require("mongoose");

const configs = mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String },
  type: {
    type: String,
    require: true,
    enum: ["city", "experience", "university", "job"],
  },
});

module.exports = mongoose.model("configs", configs);
