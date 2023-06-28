const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

//fait appel a chaque collection
db.user = require("./user.model");
db.role = require("./role.model");
db.blog = require("./blog.model");

//créé tableau avec les deux roles
db.ROLES = ["user", "admin"];

module.exports = db;