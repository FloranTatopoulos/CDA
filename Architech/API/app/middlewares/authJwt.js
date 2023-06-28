const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models")
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    //recupere la valeur de l'en-tete d'autorisation
    let split = req.headers['authorization'];
    //divise la chaîne d'autorisation en sous-chaînes puis
    //extrait le token de l'en-tete
    if (split) {
      let token = split.split(" ")[1] //element 1 car 'bearer token'
    //verifie la valeur du token
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      //decode le token et l'assigne a un utilisateur
      req.userId = decoded.id;
      next();
      });
      //si il n'existe pas de token
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  
  };
  
isAdmin = (req, res, next) => {
  //recherche l'utilisateur avec son id
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //cherche son role
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          //verifie si le role est adminstrateur
          if (roles[i].name === "admin") {
            next();
            return;
          }}
        //si le role n'est pas assez élevé
        res.status(403).send({ 
          message: "Vous devez etre administrateur!" });
        return;
      }
    );
  });
};

  const authJwt = {
    verifyToken,
    isAdmin,
  };
  module.exports = authJwt;