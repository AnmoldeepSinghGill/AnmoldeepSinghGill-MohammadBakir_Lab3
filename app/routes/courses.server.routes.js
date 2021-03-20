//Load the 'courses' controller
var courses = require("../controllers/courses.server.controller");

//handle routing for get and post request
module.exports = function (app) {
  app.post("/course", courses.addCourse);
  app.get("/courses", courses.listAllCourses);
};
