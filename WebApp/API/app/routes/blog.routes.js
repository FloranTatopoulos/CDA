const controller = require("../controllers/blog.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("api/blog/readPost", controller.getAllPosts);
  app.post("/api/blog/createPost", [authJwt.verifyToken, authJwt.isAdmin], controller.createPost);
  app.put("/api/blog/updatePost/:id", [authJwt.verifyToken, authJwt.isAdmin],controller.updatePost);
  app.delete("/api/blog/deletePost/:id", [authJwt.verifyToken, authJwt.isAdmin],controller.deletePost);

};