
const { Client } = require('pg');
const config = require('../config/cb.config');
const client = new Client(config.db);

module.exports = client;