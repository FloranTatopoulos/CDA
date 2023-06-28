const mongoose = require("mongoose");

const blogSchema = mongoose.model(
  //créé une collection mongoDB nommée Blog
  "Blog",
  new mongoose.Schema({
    theme: String,
    author: String,
    image: String,
    title: String,
    body: String,
  },
  {
    //date de création et de modification
    timestamps: true,
  })
);

module.exports = blogSchema;