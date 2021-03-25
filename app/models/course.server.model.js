// Load the Mongoose module and Schema object
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
 * Name: Anmoldeep Singh Gill, Mohammad bakir
 * Student Number: 301044883, 300987420
 */

//define a new CourseSchema
const CourseSchema = new Schema({
  courseCode: String,
  courseName: String,
  section: String,
  semester: String,
});
//
mongoose.model("Course", CourseSchema);
