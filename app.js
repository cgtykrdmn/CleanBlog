const express = require('express');
const path = require("path");
const app = express();
const ejs = require("ejs")

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render("index");
})
app.get('/about', (req, res) => {
  res.render("about");
})
app.get('/add_post', (req, res) => {
  res.render("add_post");
})

const port = 3000;
app.listen(port, () => {
  console.log(`${port} has been started.`);
});