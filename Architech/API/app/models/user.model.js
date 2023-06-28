const mongoose = require("mongoose");

const User = mongoose.model(
    //créé une collection mongoDB nommée User
  "User",
  new mongoose.Schema({
    //définit les attributs de la collection User
    username: String,
    email: String,
    password: String,
    roles: [
      {
        //fait appel a la table Role pour définir le role de l'User
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
