const dbUrl = {
  local: "mongodb://localhost:27017/employee",
  stage: "mongodb://localhost:27017/employee",
  production: "mongodb://localhost:27017/employee",
};

module.exports = {
  url: dbUrl.local,
};
