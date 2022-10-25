const { Pool, Client } = require('pg')

let db = new Pool({
  user: 'myadmin',
  host: '51.89.186.228',
  database: 'rfiddb',
  password: 'XENONduman',
  port: 5432,
})

module.exports = { db } 

