'use strict'

const { graphql, buildSchema } = require('graphql');

/* Definiendo el esquema: define la api en graphql*/
const schema = buildSchema(`
  type Query {
    hello: String
    salute: String
  }
`);

/* Configurar los resolvers */
const resolvers = {
  hello: () => {
    return 'Hello world';
  },
  salute: () => 'Hello everyone'
};

/* Ejecutar query hello */
graphql(schema, `{ hello salute }`, resolvers)
  .then((data) => {
    console.log(data);
  });