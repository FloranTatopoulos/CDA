const controller = require("../controllers/blog.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("api/blog/blog", controller.getAllPosts);
  app.post("/api/blog/blog", [authJwt.verifyToken, authJwt.isAdmin], controller.createPost);
  app.get("/api/blog/blog/:id", controller.readPost);
  app.put("/api/blog/blog/:id", [authJwt.verifyToken, authJwt.isAdmin],controller.updatePost);
  app.delete("/api/blog/blog/:id", [authJwt.verifyToken, authJwt.isAdmin],controller.deletePost);

};