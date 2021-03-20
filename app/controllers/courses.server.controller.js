const Course = require("mongoose").model("Course");

exports.addCourse = (req, res) => {
  const course = new Course(req.body);
  console.log(req.body);

  // Try saving the new Course  document
  course.save((err, course) => {
    // If an error occurs, use flash messages to report the error
    if (err) {
      // Use the error handling method to get the error message
      const message = getErrorMessage(err);
      console.log(message);
    }

    // Redirect the Student  back to the main application page
    res.status(200).send({ course: course });
  });
};

exports.listAllCourses = (req, res, next) => {
  Course.find({}, (err, courses) => {
    if (err) {
      return next(err);
    } else {
      console.log("courses", courses);
      res.status(200).send(courses);
    }
  });
};

// 'courseById' controller method to find a course by its id
exports.courseById = function (req, res, next, id) {
  // Use the 'Course' static 'findById' method to retrieve a specific student
  Course.findById(id, (err, course) => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Set the 'req.course' property
      req.course = course;
      console.log(course);
      // Call the next middleware
      next();
    }
  });
};
