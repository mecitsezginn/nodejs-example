const { Pool, Client } = require('pg')

let db = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'db',
  password: 'secret',
  port: 5432,
})


module.exports = {db} 