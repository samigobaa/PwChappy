const pg = require('pg');
const userSchema = pg.Client({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:String
});
const user = pg.Pool('User',userSchema);
module.exports = user;