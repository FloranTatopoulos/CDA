const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    roles: "645cbad38de55f7e8b21b9de"
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "Inscription réussie" });
  });
};

exports.signin = (req, res) => {
    console.log(req.headers)
    User.findOne({
      username: req.body.username,
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "Utilisateur non trouvé." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({ message: "Mot de passe incorrect!" });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400,
        });
  
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
  
        req.session.token = token;
  
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
        });
      });
  };

  exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({ message: "Vous avez ete deconnecté" });
    } catch (err) {
      this.next(err);
    }
  };