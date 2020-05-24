'use strict'

const { MongoClient } = require('mongodb')
const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

let connection

const connectDB = async () => {
  if(connection) return connection

  let client

  try {
    client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    let connectDB = await client.connect()
    connection = connectDB.db(DB_NAME);
  }
  catch(error){
    console.error('Could not connect to db', mongoUrl, error)

    process.exit(1)  //sacar el proceso
  }

  return connection
}

module.exports = connectDB