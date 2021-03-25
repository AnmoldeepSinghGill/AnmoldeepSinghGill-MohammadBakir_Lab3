//Load the 'students' controller
var students = require("../controllers/students.server.controller");
var courses = require("../controllers/courses.server.controller");

/*
 * Name: Anmoldeep Singh Gill, Mohammad bakir
 * Student Number: 301044883, 300987420
 */

//handle routing for get and post request
module.exports = function (app) {
  // students api for getting posting and updating students
  app.post("/api/student", students.signUp);
  app.get("/api/students", students.loginGuard, students.listAllStudents);
  app.get("/api/students/:studentId", students.sendStudentFoundById);

  // sign in, sign out and read_cookie for authentications
  app.post("/api/signin", students.authenticate);
  app.get("/api/signout", students.signout);
  app.get("/api/read_cookie", students.isSignedIn);

  // enroll and drop a course from student profile
  app.put(
    "/api/enrollCourse/:studentId/:courseId",
    students.enrollStudentInCourse
  );
  app.put(
    "/api/dropCourse/:studentId/:courseId",
    students.dropCourseByStudentId
  );

  // gets all the courses in which the student is enrolled
  app.get("/api/studentCourses/:studentId", students.getAllCoursesByStudent);

  // gets all the students enrolled in a specific course
  app.get("/api/studentsByCourse/:courseId", students.listAllStudentsByCourse);

  // params to populate student and coure from studentId and courseId
  app.param("studentId", students.studentById);
  app.param("courseId", courses.courseById);
};
