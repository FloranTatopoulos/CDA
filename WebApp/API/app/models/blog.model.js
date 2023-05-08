const mongoose = require("mongoose");

const blogSchema = mongoose.model(
  "Blog",
  new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    body: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = blogSchema;
