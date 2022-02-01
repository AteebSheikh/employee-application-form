const auth = require("./auth");
const employee = require("./employee");
const configs = require("./configs");
const JobDetails = require("./jobDetails");
const Jobs = require("./job");

const routing = {
  auth,
  employee,
  configs,
  JobDetails,
  Jobs,
};

module.exports = routing;
