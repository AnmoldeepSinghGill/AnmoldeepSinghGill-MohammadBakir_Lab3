//Load the 'students' controller
var students = require("../controllers/students.server.controller");
var courses = require("../controllers/courses.server.controller");

//handle routing for get and post request
module.exports = function (app) {
  // app.post('/signin', users.authenticate);
  // app.get('/welcome',users.welcome);

  app.post("/api/student", students.signUp);
  app.get("/api/students", students.listAllStudents);
  app.get("/api/students/:studentId", students.sendStudentFoundById);
  app.get("/api/course/:courseId", students.listAllStudentsByCourse);

  app.post("/api/signin", students.authenticate);
  app.get("/api/signout", students.signout);
  app.get("/api/read_cookie", students.isSignedIn);

  app.put(
    "/api/addCourse/:studentId/:courseId",
    students.enrollStudentInCourse
  );
  app.put(
    "/api/dropCourse/:studentId/:courseId",
    students.dropCourseByStudentId
  );

  app.get("/api/studentCourses/:studentId", students.getAllCoursesByStudent);

  app.param("studentId", students.studentById);
  app.param("courseId", courses.courseById);
};
