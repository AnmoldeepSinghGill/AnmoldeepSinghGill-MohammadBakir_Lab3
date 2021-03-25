import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Login from "./Login";

function ShowUser(props) {
  const [screen, setScreen] = useState("");
  const [data, setData] = useState({});
  const [courses, setCourses] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [screen, setScreen] = useState("");
  const apiUrl = "http://localhost:3000/api/students/";
  const dropCourseApi = "/api/dropCourse/";

  useEffect(() => {
    setShowLoading(false);

    readCookieAndGetStudentDetails();
  }, []);

  const fetchData = async (id) => {
    const result = await axios(apiUrl + id);
    setData(result.data);
    setCourses(result.data.courses);
    setShowLoading(false);
  };

  // checking if the user is signed in
  const readCookieAndGetStudentDetails = async () => {
    try {
      const res = await axios.get("/api/read_cookie");

      if (res.data.screen) {
        if (res.data.screen !== "auth") {
          if (res.data.id) {
            fetchData(res.data.id);
          }
        } else {
          setScreen("signedOut");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editUser = (id) => {
    props.history.push({
      pathname: "/edit/" + id,
    });
  };

  const logOut = async () => {
    const res = await axios.get("/api/signout");
    if (res.data.message === "signed out") {
      props.history.push("/login");
    }
  };

  const dropCourse = async (courseId) => {
    setShowLoading(true);
    axios
      .put(dropCourseApi + data.id + "/" + courseId)
      .then((result) => {
        setShowLoading(false);
        readCookieAndGetStudentDetails();
      })
      .catch((error) => {
        console.log("error in drop course:", error);
        setShowLoading(false);
      });
  };

  const showCourses = () => {
    props.history.push("/listCourses");
  };

  return (
    <div>
      {screen !== "signedOut" ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <Jumbotron>
            <div className="row justify-content-center">
              <h1>Your Info</h1>
            </div>
            <div className="row">
              <h2>
                Name: {data.firstName}, {data.lastName}
              </h2>
            </div>
            <div className="row">
              <h5>Email: {data.email}</h5>
            </div>
            <div className="row">
              <h5>Student Number: {data.studentNumber}</h5>
            </div>
            <div className="row">
              <h5>Program: {data.program}</h5>
            </div>
            <div className="row">
              <h5>Address: {data.address}</h5>
            </div>
            <div className="row">
              <h5>City: {data.city}</h5>
            </div>
            <div className="row">
              <h5>Phone Number: {data.phoneNumber}</h5>
            </div>

            <div className="row justify-content-center">
              <h1>Your Courses</h1>
            </div>
            {courses.map((course, idx) => (
              <div className="row justify-content-center" key={idx}>
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{course.courseName}</h5>
                      <p className="card-text">
                        {course.courseCode}-{course.section}
                      </p>
                      <p className="card-text">Semester-{course.semester}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          dropCourse(course._id);
                        }}
                      >
                        Drop Course
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="row justify-content-center profileButtons">
              <Button variant="success" onClick={showCourses}>
                Enroll in a New Course
              </Button>
            </div>
            <div className="row justify-content-center profileButtons">
              <Button variant="danger" onClick={logOut}>
                Log out
              </Button>
            </div>
          </Jumbotron>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default withRouter(ShowUser);
