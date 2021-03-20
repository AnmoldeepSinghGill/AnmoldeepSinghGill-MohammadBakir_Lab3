const Course = require("mongoose").model("Course");

exports.addCourse = (req, res, next) => {
    const course = new Course(req.body);
    console.log(req.body);

    course.save((err, course) => {
        if (err) {
            return next(err);
        }
        res.status(200).send({course: course});
    });
};

exports.updateCourse = (req, res, next) => {
    const course = new Course(req.body);
    console.log(req.body);

    Course.findByIdAndUpdate(req.params.courseId, course, function (err, co) {
        if (err) {
            return next(err);
        }
        res.status(200).send(co);
    });
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
