const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  ssl: true
})

module.exports = client;