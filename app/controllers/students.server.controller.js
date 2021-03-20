// Load the module dependencies
const Student = require("mongoose").model("Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

// Create a new error handling controller method
const getErrorMessage = function (err) {
  // Define the error message variable
  var message = "";

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = "Student name already exists";
        break;
      // If a general error occurs set the message error
      default:
        message = "Something went wrong";
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};

exports.authenticate = function (req, res, next) {
  // Get credentials from request body
  const { email, password } = req.body;
  console.log(email);
  //find the Student  with given email using static method findOne
  Student.findOne({ email: email }, (err, Student) => {
    if (err) {
      return next(err);
    } else {
      console.log(Student);
      //compare passwords
      if (bcrypt.compareSync(password, Student.password)) {
        // Create a new token with the Student  id in the payload
        // and which expires 300 seconds after issue
        const token = jwt.sign({ id: Student._id }, jwtKey, {
          algorithm: "HS256",
          expiresIn: jwtExpirySeconds,
        });
        console.log("token:", token);
        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds
        res.cookie("token", token, {
          maxAge: jwtExpirySeconds * 1000,
          httpOnly: true,
        });
        res.status(200).send({ email: email });

        //res.json({status:"success", message: "Student  found!!!", data:{Student :
        //Student , token:token}});

        //call the next middleware
        next();
      } else {
        res.json({
          status: "error",
          message: "Invalid Email or Password",
          data: null,
        });
      }
    }
  });
};

exports.verifyStudent = function (req, res, next) {
  jwt.verify(req.headers["x-access-token"], jwtKey, function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add Student  id to request
      req.body.StudentId = decoded.id;
      next();
    }
  });
};

// protected page uses the JWT token
exports.welcome = (req, res) => {
  // We can obtain the session token from the requests cookies,
  // which come with every request
  const token = req.cookies.token;

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, return the welcome message to the Student , along with their
  // Student name given in the token
  res.send(`Welcome Student  with ID: ${payload.id}!`);
};

exports.signUp = (req, res) => {
  const student = new Student(req.body);
  console.log(req.body);

  // Try saving the new Student  document
  student.save((err, student) => {
    // If an error occurs, use flash messages to report the error
    if (err) {
      // Use the error handling method to get the error message
      const message = getErrorMessage(err);
      console.log(message);
    }

    // Redirect the Student  back to the main application page
    res.status(200).send({ student: student });
  });
};

exports.listAllStudents = (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      return next(err);
    } else {
      console.log("students", students);
      res.status(200).send(students);
    }
  });
};
