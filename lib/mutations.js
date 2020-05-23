'use strict'
const connectDB = require('./db')


module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = { //campos que no son obligatorios
      teacher: '',
      topic: ''
    }

    const newCourse = Object.assign(defaults, input);

    let db, course

    try {
      db = await connectDB()

      course = await db.collection('courses').insertOne(newCourse)
      /* insertedId return the last id inserted */
      newCourse._id = course.insertedId
    }
    catch(error){
      console.error(error)
    }

    return newCourse
  } 
}

/*
peticion desde graphiql
 mutation {
  createCourse(input: {
    title: "Curso de ejemplo 4"
    description: "description 4"
    topic: "desing"
  }){
    _id
    title
    description
  }
} */