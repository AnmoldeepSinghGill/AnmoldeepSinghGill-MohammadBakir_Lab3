//Load the 'students' controller
var students = require("../controllers/students.server.controller");

//handle routing for get and post request
module.exports = function (app) {
  // app.post('/signin', users.authenticate);
  // app.get('/welcome',users.welcome);

  app.post("/student", students.signUp);
  app.get("/students", students.listAllStudents);

  app.put("/student/:studentId/:courseId", students.enrollStudentInCourse);
};
