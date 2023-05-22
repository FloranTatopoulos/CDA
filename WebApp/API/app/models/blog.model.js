const mongoose = require("mongoose");

const blogSchema = mongoose.model(
  "Blog",
  new mongoose.Schema({
    title: String,
    author: String,
    //{type:Schema.Types.ObjectId, ref:'User'},
    image: String,
    body: String,
  },
  {
    timestamps: true,
  })
);

module.exports = blogSchema;