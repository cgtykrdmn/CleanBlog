const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const exp = require("constants");
const app = express();
const Post = require("./models/Post");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");

const pageControllers = require("./controllers/pageControllers");
const postControllers = require("./controllers/postControllers");

//Connect DB
mongoose
  .connect(
    "mongodb+srv://<yourUsername>:<yourPassword>@cluster0.fovsqpa.mongodb.net/clean-blog-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.get("/", pageControllers.getAllPost);
app.get("/posts/:id", pageControllers.getPost);
app.get("/about", pageControllers.getAboutPage);
app.get("/add_post", pageControllers.getAddPage);
app.get("/posts/edit/:id", pageControllers.getEdit);

app.post("/posts", postControllers.getAddPost);
app.put("/posts/:id", postControllers.getUpdatePost);
app.delete("/posts/:id", postControllers.getDeletePost);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`${port} has been started.`);
});
