const mongoose = require("mongoose");

const blogSchema = mongoose.model(
  "Blog",
  new mongoose.Schema({
    theme: String,
    author: String,
    image: String,
    title: String,
    body: String,
  },
  {
    timestamps: true,
  })
);

module.exports = blogSchema;