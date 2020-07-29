const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
var PORT = process.env.PORT || 3001;
const mainDir = path.join(__dirname, "/Develop/public");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* GET: Reads 'db.json' file and return all saved notes as JSON */
app.get("/notes", function (req, res) {
  res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(mainDir, "/index.html"));
});

/* POST: Receives a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. */

app.post("/api/notes", function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = savedNotes.length.toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Note saved to db.json. Content: ", newNote);
  res.json(savedNotes);
});

/* DELETE: receive a query parameter containing the id of a note to delete. */

app.listen(PORT, function () {
  console.log(`Now listening to port ${PORT}. We Heard You!`);
});
