const { Client } = require('pg')

const client = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"postgresql",
    database:"PwChappy"
})
client.connect((err)=>{
    if (err) {
        console.log('connection error',err.stack);
    } else {
      console.log('connected');  
    }
});
client.query('')
module.exports = client;
