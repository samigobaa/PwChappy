// const express = require('express');
// const app = express();
// const { Client } = require('pg');
// const PORT = 3000;

// const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "postgresql",
//     database: "PwChappy"
// });


// app.listen(3000, (req,res) => {
//     console.log(`Server is running on port ${PORT}`);
//     const con = client.connect(async (err,res) => {
//         if (err) {
//             console.error('Connection error', err.stack);
//         } else {
//             console.log('Connected to database');
           
//              const result = await res.query('SELECT * FROM users');
//              console.log(result['rows'])
//         }
//     });
 
// });
// db.js
const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgresql",
    database: "PwChappy"
});

client.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to database');
    }
});

module.exports = client;
