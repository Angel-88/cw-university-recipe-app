const { Client } = require('pg');

// const client = new Client(process.env.DB_URL);
// console.log(client);
const client = new Client({
  user: 'postgres',
  password: '1234567890',
  host: 'localhost',
  port: 5432,
  database: "recipe_app",
});


// pool.connect();
//
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
//Configuring PostgresSQL Database

module.exports = client;