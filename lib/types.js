/* Cada vez que graphql necesite un tipo en una consulta, va a consumir este archivo */

'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
  Course: {
    people: async ({ people }) => {
      //va a recibir todos los campos que tiene el elemento curso
      let db
      let peopleData
      let ids
      
      try {
        db = await connectDB()
        ids = people ? people.map((id) => ObjectID(id)) : []
        peopleData = ids.length > 0 ?
          await db.collection('students').find( //va a buscar en todos los estudiantes que recibamos en el campo de people
            { _id: { $in: ids } }
          ).toArray()
          :
          []
      }
      catch(error){
        console.log(error);
      }

      return peopleData
    } 
  }
}