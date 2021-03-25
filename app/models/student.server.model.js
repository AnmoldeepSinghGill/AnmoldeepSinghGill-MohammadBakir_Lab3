// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;

/*
 * Name: Anmoldeep Singh Gill, Mohammad bakir
 * Student Number: 301044883, 300987420
 */

// Define a new 'StudentSchema'
const StudentSchema = new Schema({
  studentNumber: Number,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    // Set an email index
    index: true,
    // Validate the email format
    match: /.+\@.+\..+/,
    unique: true,
  },

  password: {
    type: String,
    // Validate the 'password' value length
    validate: [(password) => password.length >= 6, "Password Should Be Longer"],
  },
  address: String,
  city: String,
  phoneNumber: String,
  program: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// Use a pre-save middleware to hash the password
// before saving it into database
StudentSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'Student' model out of the 'StudentSchema'
mongoose.model("Student", StudentSchema);
