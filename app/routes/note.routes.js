var express = require("express");
var router = express.Router();
var employeeController = require("../controllers/employee");

// Create a new Note
router.post("/employee", employeeController.create);
router.get("/employee/:page/:limit", employeeController.getData);

// Retrieve all Notes
// app.get("/notes", notes.findAll);

// // Retrieve a single Note with noteId
// app.get("/notes/:noteId", notes.findOne);

// // Update a Note with noteId
// app.put("/notes/:noteId", notes.update);

// // Delete a Note with noteId
// app.delete("/notes/:noteId", notes.delete);
module.exports = router;
