const Jobs = require("../models/jobs.js");

exports.addjobs = (req, res) => {
  const job = new Jobs({
    jobName: req.body.jobName,
    description: req.body.description,
    education: req.body.education,
    hours: req.body.hours,
    jobType: req.body.jobType,
    activeJob: req.body.activeJob,
    formUrl: req.body.formUrl,
  });

  job
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};
exports.getJobs = (req, res) => {
  const limit = 10;
  const page = req.query.page;
  let type = req.query.type;
  let search = req.query.search;
  let abc = parseInt(page - 1);
  let query = search
    ? { jobName: { $regex: search, $options: "i" } }
    : type
    ? { type: type }
    : {};
  Jobs.find(query)
    .sort({ _id: -1 })
    .skip(abc * limit)
    .limit(type ? limit : "")
    .exec((err, doc) => {
      if (err) {
        return res.status(200).json(err);
      }
      Jobs.countDocuments(query).exec((count_error, count) => {
        if (err) {
          return res.status(500).json(count_error);
        }
        return res.status(200).json({
          total: count,
          page: page,
          pageSize: doc.length,
          data: doc,
          message: "success",
          status: 200,
        });
      });
    });
};

exports.delete = async (req, res) => {
  let id = req.query.id;
  console.log(id);

  try {
    const row = await Jobs.remove({ _id: id });
    res.send({ data: row });
  } catch {
    res.status(404).send({ error: "Id is not found!" });
  }
};

exports.update = async (req, res) => {
  let id = req.query.id;
  let updatedData = {
    jobName: req.body.jobName,
    hours: req.body.hours,
    description: req.body.description,
    education: req.body.education,
    jobType: req.body.jobType,
    activeJob: req.body.activeJob,
    formUrl: req.body.formUrl,
  };
  try {
    const update = await Jobs.findByIdAndUpdate(id, updatedData, {
      new: true,
      upsert: true,
    });
    // console.log(req.body);
    res.send({ data: update });
  } catch {
    res.status(404).send({ error: "Id is not found!" });
  }
};
exports.getJobById = (req, res) => {
  let id = req.query.id;
  Jobs.findOne({ _id: id })
    .then((data) => {
      res.status(200).send({ data: data, message: "success" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};
