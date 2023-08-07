const Post = require("../models/Post");
const fs = require('fs');


exports.getAddPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
};

exports.getUpdatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.description = req.body.description;
  post.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.getDeletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect("/");
};
