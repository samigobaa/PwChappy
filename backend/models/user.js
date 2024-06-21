const pg = require('pg');
const User = {
    firstandlastname: String,
    username: String,
    email: String,
    password: String,
    sex: String, // Ajout du champ sex
    role: String
  };
const user = pg.Pool('User',User);
module.exports = user;