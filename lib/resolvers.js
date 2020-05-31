'use strict'

const queries = require('./queries')
const mutations = require('./mutations')
const types = require('./types')

module.exports = {
  Query: queries,
  Mutation: mutations,
  ...types  //si se define otro tipo, lo va a traer con las mismas propiedades que se tienen types para Course en este caso
}