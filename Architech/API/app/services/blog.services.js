const BlogModel = require("../models/blog.model");

exports.getAllBlogs = async () => {
  return await BlogModel.find();
  //recherche tous les posts
};

exports.getBlogById = async (id) => {
  return await BlogModel.findById(id);
  //recherche uniquement un post
};

exports.createBlog = async (blog) => {
  return await BlogModel.create(blog);
  //créé un post
};
 
exports.updateBlog = async (id, blog) => {
  return await BlogModel.findByIdAndUpdate(id, blog);
  //recherche un post et le met a jour
};
 
exports.deleteBlog = async (id) => {
  return await BlogModel.findByIdAndDelete(id);
  //recherche un post et le supprime
};