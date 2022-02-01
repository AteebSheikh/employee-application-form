const jobs = require("../models/jobs.js");
exports.JobDescription = (req, res) => {
  let id = req.query.id;
  jobs
    .find({ _id: id })
    .then((data) => {
      res.status(200).send({ data, message: "success" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};
