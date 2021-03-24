//Load the 'courses' controller
var courses = require("../controllers/courses.server.controller");

//handle routing for get and post request
module.exports = function (app) {
  app
    .post("/api/course", courses.addCourse)
    .get("/api/courses", courses.listAllCourses)
    .put("/course/:courseId", courses.updateCourse)
    .delete("/course", courses.updateCourse);
};
