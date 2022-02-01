const Employee = require("../models/employee.js");
const path = require("path");
const moment = require("moment");
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
exports.create = (req, res) => {
  const employee = new Employee({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    contact: req.body.phone,
    address: req.body.address,
    description: req.body.description,
    experience: req.body.experience,
    jobPosition: req.body.position,
    currentCompany: req.body.currentcompany,
    gender: req.body.gender,
    city: req.body.city,
    degree: req.body.degree,
    university: req.body.university,
  });
  if (req.file) {
    employee.file = req.file.filename;
  }
  employee
    .save()
    .then((data) => {
      res.status(200).send({ data: data, message: "data insert Successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred .",
      });
    });
};

let fileName = "";
exports.getUserById = (req, res) => {
  let id = req.query.id;
  Employee.findOne({ _id: id })
    .then((data) => {
      fileName = data.file;
      createDate = data.created;
      let date = moment(createDate).format("DD-MMM-YYYY");
      const newData = { ...data, created: date };
      res.status(200).send({ data: newData, message: "success" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};
exports.fileGet = (req, res) => {
  res.status(200).send(`http://localhost:3000/upload/${fileName}`);
};
exports.getData = (req, res) => {
  const limit = 10;
  const page = req.query.page;
  const search = req.query.search;
  let abc = parseInt(page - 1);
  let query = search ? { firstName: { $regex: search, $options: "i" } } : {};
  Employee.find(query)
    .sort({ _id: -1 })
    .skip(abc * limit)
    .limit(limit)
    .exec((err, doc) => {
      if (err) {
        return res.status(200).json(err);
      }
      Employee.countDocuments(query).exec((count_error, count) => {
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
