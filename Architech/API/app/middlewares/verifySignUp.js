const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  //recherche un username existant dans la collection User
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //s'il y a deja un utilisateur a ce nom
    if (user) {
      res.status(400).send({ message: "Ce nom d'utilisateur est deja pris!" });
      return;
    }
    //recherche un email existant dans la collection User
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      //s'il y a deja un utilisateur a ce mail
      if (user) {
        res.status(400).send({ message: "Cet email est deja pris!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      //recherche si le role est bien dans le tableau du modele Role
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          //si le role n'existe pas 
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;