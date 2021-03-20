//Load the 'students' controller
var students = require("../controllers/students.server.controller");
var courses = require("../controllers/courses.server.controller");

//handle routing for get and post request
module.exports = function (app) {
  // app.post('/signin', users.authenticate);
  // app.get('/welcome',users.welcome);

  app.post("/student", students.signUp);
  app.get("/students", students.listAllStudents);
  app.get("/course/:courseId", students.listAllStudentsByCourse);

  app.put("/addCourse/:studentId/:courseId", students.enrollStudentInCourse);
  app.put("/dropCourse/:studentId/:courseId", students.dropCourseByStudentId);

  app.get("/studentCourses/:studentId", students.getAllCoursesByStudent);

  app.param("studentId", students.studentById);
  app.param("courseId", courses.courseById);
};
