const blogService = require("../services/blog.services");

exports.readPost = async (req, res) => {
  try {
    //affiche tous les posts
    const blogs = await blogService.getAllBlogs();
    res.json({ data: blogs, status: "Posts affichés" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    //affiche uniquement un post choisi
    const blog = await blogService.getBlogById(req.params.id);
    res.json({ data: blog, status: "Post affiché" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async(req, res) => {
    try {
      //créer un nouveau post
        const blog = await blogService.createBlog(req.body);
        res.json({ data: blog, status: "Post créé" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

exports.updatePost = async(req, res) => {
  try {
    //met a jour un post choisi
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.json({ data: blog, status: "Post mis a jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.deletePost = async(req, res) => {
  try {
    //supprime un post choisi
    const blog = await blogService.deleteBlog(req.params.id);
    res.json({ data: blog, status: "Post supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}