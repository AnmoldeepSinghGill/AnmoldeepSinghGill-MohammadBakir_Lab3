//Load the 'courses' controller
var courses = require("../controllers/courses.server.controller");

//handle routing for get and post request
module.exports = function (app) {
  app.post("/api/course", courses.addCourse);
  app.get("/api/courses", courses.listAllCourses);
  app.put("/api/course/:courseId", courses.updateCourse);
  app.get("/api/getCourse/:courseId", courses.getCourseById);
};
