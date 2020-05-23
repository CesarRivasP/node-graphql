'use strict'

const courses = [
  {
    _id: "ID1",
    title: "Mi titulo",
    teacher: "Mi profesor",
    description: "Una descripcion",
    topic: "programacion"
  },
  {
    _id: "ID2",
    title: "Mi titulo 1 ",
    teacher: "Mi profesor",
    description: "Una descripcion",
    topic: "programacion"
  },
  {
    _id: "ID3",
    title: "Mi titulo 2",
    teacher: "Mi profesor",
    description: "Una descripcion",
    topic: "programacion"
  }
]

module.exports = {
  Query: {
    getCourses: () => courses,
    getCourse: (root, args) => {
      const course = courses.filter((course) => course._id === args.id)

      return course.pop()  // .pop devuelve solo el primer elemento
    }
  }
}