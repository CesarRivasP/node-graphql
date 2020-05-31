'use strict'
const connectDB = require('./db')
const { ObjectID } = require('mongodb')  //transforma un id de string a un objeto de id de mongo


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
  },
  createStudent: async (root, { input }) => {
    let db, student

    try {
      db = await connectDB()

      student = await db.collection('students').insertOne(input)
      /* insertedId return the last id inserted */
      input._id = student.insertedId
    }
    catch(error){
      console.error(error)
    }

    return input
  },
  editCourse: async (root, { _id, input }) => {
    let db, course
    
    try {
      db = await connectDB()

      await db.collection('courses').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }  // operacion set
      )

      course = await db.collection('courses').findOne({ _id: ObjectID(_id) }) //asi se obtiene el course que se va a retornar
    }
    catch(error){
      console.error(error);
    }

    return course
  },
  editStudent: async (root, { _id, input }) => {
    let db, student
    
    try {
      db = await connectDB()

      await db.collection('students').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }  // operacion set
      )

      student = await db.collection('students').findOne({ _id: ObjectID(_id) }) //asi se obtiene el student que se va a retornar
    }
    catch(error){
      console.error(error);
    }

    return student
  },
  addPeople: async (root, { courseID, personID }) => {
    let db, person, course

    try {
      db = await connectDB()

      course = await db.collection('courses').findOne({
        _id: ObjectID(courseID)
      })
      person = await db.collection('students').findOne({
        _id: ObjectID(personID)
      })

      if(!course || !person) throw new Error('La persona o el curso no existe')

      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID) } }
      )
    }
    catch(error){
      console.error(error)
    }

    return course
  },
  deleteCourse: async (root, { _id }) => {
    let db

    try {
      db = await connectDb()

      await db.collection('courses').deleteOne(
        { _id: ObjectID(_id) }
      )
    } 
    catch (error) {
      console.error(error)
    }

    return true
  },
  deleteStudent: async (root, { _id }) => {
    let db

    try {
      db = await connectDb()

      await db.collection('student').deleteOne({
        _id: ObjectID(_id)
      })
    } 
    catch (error) {
      console.error(error)
    }

    return true
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
}
mutation {
  createStudent(input: {
    name: "Andres Rivas"
    email: "andreselias2303@gmail.com"
  }){
    _id
    name
    email
  }
}
mutation {
  editCourse(id: "5ec95bf5e240e240ac59e5ea", input: {
    title: "MI NUEVO TITULO"
  }){
    _id
    title
  }
}
mutation {
  editCourse(_id: "5ec95bf5e240e240ac59e5ea", input: {
    title: "MI NUEVO TITULO"
    description: "NUEVA DESCRIPCION"
  }){
    _id
    title
  }
}

 mutation {
  addPeople(input: {
    courseID: "Curso de ejemplo 4"
    personID: "description 4"
  }){
    _id
    title
    description
  }
}
*/