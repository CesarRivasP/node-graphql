'use strict'

const { 
  /* buildSchema */ 
  makeExecutableSchema  // semejante a buildSchema, pero realiza las tareas de una manera mas especializada
} = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')  // para leer el archivo de forma asincrona
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()

const port = process.env.port || 3000

const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)

/* Definiendo el esquema: define la api en graphql */
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers, // resolvers que va a ejecutar
  graphiql: true // graphiql es el entorno de desarrollo a utilizar
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
