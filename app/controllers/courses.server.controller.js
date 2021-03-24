const Course = require("mongoose").model("Course");

exports.addCourse = (req, res, next) => {
  const course = new Course(req.body);
  console.log(req.body);

  course.save((err, course) => {
    if (err) {
      return next(err);
    }
    res.status(200).send(course);
  });
};

exports.updateCourse = (req, res, next) => {
  const course = new Course(req.body);
  console.log(req.body);

  Course.findByIdAndUpdate(req.params.courseId, course, function (err, co) {
    if (err) {
      return next(err);
    }
  });
  res.status(200).send(co);
};

exports.listAllCourses = (req, res) => {
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

exports.deleteCourse = (req, res, next) => {
  Course.findByIdAndDelete(req.params.courseId, function (err) {
    if (err) {
      return next(err);
    } else {
      res.status(200).send({ messgae: "Succesfully Deleted" });
    }
  });
};
