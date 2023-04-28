const db = require("../models");
const User = db.user;
const blogService = require("../services/blog.services");

exports.createPost = async(req, res) => {
    try {
        const blog = await blogService.createBlog(req.body);
        res.json({ data: blog, status: "Post créé" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

exports.readPost = async(req, res) => {
    try {
        const blog = await blogService.createBlog(req.body);
        res.json({ data: blog, status: "Post affiché" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};


exports.updatePost = async(req, res) => {

}

exports.deletePost = async(req, res) => {
    
}