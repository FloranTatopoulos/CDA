const express = require("express");
const cookieSession = require("cookie-session");
const dotenv = require('dotenv')
dotenv.config();

//définition du framework express
const app = express();
//definition des cors (sécurité pour contrôler les requêtes d'un domaine vers un autre)
var cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

app.use("/static", express.static('./static/'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//définition de la session
app.use(
  cookieSession({
    name: "architech-session",
    secret: "COOKIE_SECRET", 
    httpOnly: true
  })
);

//appel a la collection Role
const db = require("./app/models");
const Role = db.role;

db.mongoose
//connexion a Mongoose lors du lancement de l'API
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur ArchiTech !" });
  });
  
  //définition des routes
  require("./app/routes/auth.routes")(app);
  require("./app/routes/user.routes")(app);
  require("./app/routes/contact.routes")(app);
  require("./app/routes/blog.routes")(app);
  
  //définition du port sur lequel le serveur tourne
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        //ajoute des nouveaux roles dans la collection Role
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("role 'user' ajouté dans la table role");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("role 'admin' ajouté dans la table role");
        });
      }
    });
  }