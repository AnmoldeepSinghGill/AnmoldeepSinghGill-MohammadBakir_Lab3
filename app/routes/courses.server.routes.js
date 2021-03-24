//Load the 'courses' controller
var courses = require("../controllers/courses.server.controller");

//handle routing for get and post request
module.exports = function (app) {
  app
    .post("/api/courses", courses.addCourse)
    .get("/api/courses", courses.listAllCourses)
    .put("/api/courses/:courseId", courses.updateCourse)
    .delete("/api/courses/:courseId", courses.deleteCourse);
};
