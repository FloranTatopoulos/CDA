const controller = require("../controllers/blog.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      //spécifie les en-têtes autorisés pour les demandes de CORS.
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  //fait appel a la url et au controleur d'affichage de posts
  app.get("/api/blog/readPost", controller.readPost);
  //speicifie l'id du post a afficher
  app.get("/api/blog/getPostById/:id", controller.getPostById);
  app.post("/api/blog/createPost", 
  //fait appel au middleware qui va vérifier si le token est bien administrateur
  [authJwt.verifyToken, authJwt.isAdmin], 
  controller.createPost);
  app.put("/api/blog/updatePost/:id", [authJwt.verifyToken, authJwt.isAdmin],controller.updatePost);
  app.delete("/api/blog/deletePost/:id", [authJwt.verifyToken, authJwt.isAdmin],controller.deletePost);
};