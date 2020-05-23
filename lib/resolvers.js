'use strict'

const courses = [
  {
    _id: "ID",
    title: "Mi titulo",
    teacher: "Mi profesor",
    description: "Una descripcion",
    topic: "programacion"
  },
  {
    _id: "ID",
    title: "Mi titulo 1 ",
    teacher: "Mi profesor",
    description: "Una descripcion",
    topic: "programacion"
  },
  {
    _id: "ID",
    title: "Mi titulo 2",
    teacher: "Mi profesor",
    description: "Una descripcion",
    topic: "programacion"
  }
]

module.exports = {
  getCourses: () => courses
}