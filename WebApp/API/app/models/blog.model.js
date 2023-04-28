const mongoose = require("mongoose");

const blogSchema = mongoose.model(
  "Blog",
  new mongoose.Schema({
    title: String,
    author: String,
    //mongoose.ObjectId,
    date: String,
    article: String
  })
);

module.exports = blogSchema;
