const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 8080;
const mainDir = path.join(__dirname, "/public");

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
  res.sendFile(path.join(mainDir, "index.html"));
});
