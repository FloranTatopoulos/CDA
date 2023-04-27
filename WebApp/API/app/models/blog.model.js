const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    author: String,
    date: Date,
    article: String
  })
);

module.exports = Post;
