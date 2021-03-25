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

  const editCourse = (id) => {
    props.history.push({
      pathname: "/editCourse/" + id,
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
              <h5 className="label-bold">Name: </h5>
              {data.firstName}, {data.lastName}
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
                <div className="col-sm-7">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{course.courseName}</h5>
                      <div className="row">
                        <div className="col-6">
                          <b>Code: </b> {course.courseCode}
                          <br />
                          <b>Section: </b> {course.section}
                          <br />
                          <b>Semester: </b> {course.semester}
                        </div>
                        <div className="col-6">
                          <div className="row justify-content-center">
                            <Button
                              variant="warning"
                              onClick={() => {
                                editCourse(course._id);
                              }}
                            >
                              Edit Course
                            </Button>
                          </div>
                          <div
                            className="row justify-content-center"
                            style={{ marginTop: "15px" }}
                          >
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
                      {/* <button
                        className="btn btn-danger"
                        onClick={() => {
                          dropCourse(course._id);
                        }}
                      >
                        Drop Course
                      </button>
                      &nbsp;
                      <Button
                        variant="warning"
                        onClick={() => {
                          editCourse(course._id);
                        }}
                      >
                        Edit Course
                      </Button> */}
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
          </Jumbotron>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default withRouter(ShowUser);
