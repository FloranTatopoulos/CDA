const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Post = db.post;

var jwt = require("jsonwebtoken");

exports.createPost = (req, res) => {
    const post = new Post({
      title: req.body.title,
      author: req.body.author,
      date: req.body.date,
      article: req.body.article
    });

}