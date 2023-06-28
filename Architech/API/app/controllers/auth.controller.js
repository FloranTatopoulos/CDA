const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => { //controleur d'inscription
  const user = new User({ //creation d un nouvel user
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    roles: "6482ff864536e449e6cad939" //id du role 'utilisateur'
  });

  user.save((err, user) => { //enresgitrer nouvel user dans BDD
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //si données d'inscription conformes
    res.status(200).send({ message: "Inscription réussie" }); 
  });
};

exports.signin = (req, res) => {
    console.log(req.headers)
    User.findOne({  //recherche username dans BDD
      username: req.body.username,
    })
      .populate("roles", "-__v") //attribue role
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) { //si l'utilisateur n'existe pas
          return res.status(404).send({ message: "Utilisateur non trouvé." });
        }
  
        var passwordIsValid = bcrypt.compareSync( 
          //compare mot de passe BDD et mot de passe crypté
          req.body.password,
          user.password
        );
        if (!passwordIsValid) { //si mdp incorrect
          return res.status(401).send({ message: "Mot de passe incorrect!" });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, //assigne le token a 24h
        });
  
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push(user.roles[i].name.toUpperCase());
        }
  
        res.status(200).send({ 
          //envoie les données si connexion réussie
          token:token,
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
        });
      });
  };

  exports.signout = async (req, res) => {
    try { 
      req.session = null; //detruit la session actuelle
      return res.status(200).send({ message: "Vous avez ete deconnecté" });
    } catch (err) {
      this.next(err);
    }
  };