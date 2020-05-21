'use strict'

const { graphql, buildSchema } = require('graphql');

/* Definiendo el esquema */
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

/* Ejecutar query hello */
graphql(schema, `{ hello }`)
  .then((data) => {
    console.log(data);
  });