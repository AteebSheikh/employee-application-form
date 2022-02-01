const configs = require("../models/configs.js");
exports.configs = (req, res) => {
  const config = new configs({
    name: req.body.name,
    description: req.body.description ? req.body.description : "",
    type: req.query.type,
  });
  console.log(config);

  config
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
exports.getConfigs = (req, res) => {
  const limit = 10;
  const page = req.query.page;
  let type = req.query.type;
  let search = req.query.search;
  let abc = parseInt(page - 1);
  let query = search
    ? { name: { $regex: search, $options: "i" } }
    : type
    ? { type: type }
    : {};
  configs
    .find(query)
    .sort({ _id: -1 })
    .skip(abc * limit)
    .limit(type ? limit : "")
    .exec((err, doc) => {
      if (err) {
        return res.status(200).json(err);
      }
      configs.countDocuments(query).exec((count_error, count) => {
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
