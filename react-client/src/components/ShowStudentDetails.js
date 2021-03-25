import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Login from "./Login";

/*
 * Name: Anmoldeep Singh Gill, Mohammad bakir
 * Student Number: 301044883, 300987420
 */

function ShowUser(props) {
  // defining state variables using react hooks
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

  // if user signed in get user by id
  const fetchData = async (id) => {
    const result = await axios(apiUrl + id);
    setData(result.data);
    setCourses(result.data.courses);
    setShowLoading(false);
  };

  // reding from cookies on the server and getting user details
  // unless set the view to Logout component
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

  // calling the logout route to clear jwt token from
  // the cookies and logout user
  const logOut = async () => {
    const res = await axios.get("http://localhost:3000/api/signout");
    if (res.data.message === "signed out") {
      props.history.push("/login");
    }
  };

  // drop a course from user profile
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

  // go to edit course view by course id
  const editCourse = (id) => {
    props.history.push({
      pathname: "/editCourse/" + id,
    });
  };

  // go to show all courses view
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
            <div id="profile-section">
              <div className="row justify-content-center">
                <h1>Your Info</h1>
              </div>
              <div className="row justify-content-end">
                <Button variant="danger" onClick={logOut}>
                  Logout
                </Button>
              </div>
              <div className="row justify-content-center">
                <div className="label-bold col-6 text-right">Name: </div>
                <div className="col-6">
                  {data.firstName}, {data.lastName}{" "}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="label-bold col-6 text-right">Email: </div>
                <div className="col-6"> {data.email}</div>
              </div>
              <div className="row justify-content-center">
                <div className="label-bold col-6 text-right">
                  Student Number:{" "}
                </div>
                <div className="col-6">{data.studentNumber}</div>
              </div>
              <div className="row justify-content-center">
                <div className="label-bold col-6 text-right">Program: </div>
                <div className="col-6"> {data.program}</div>
              </div>
              <div className="row justify-content-center">
                <div className="label-bold col-6 text-right">Address: </div>
                <div className="col-6"> {data.address}</div>
              </div>
              <div className="row justify-content-center">
                <div className="label-bold col-6 text-right">City: </div>
                <div className="col-6">{data.city}</div>
              </div>
              <div className="row justify-content-center">
                <div className="label-bold col-6 text-right">
                  Phone Number:{" "}
                </div>
                <div className="col-6"> {data.phoneNumber}</div>
              </div>
            </div>

            <div
              className="row justify-content-center"
              style={{ marginTop: "20px" }}
            >
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
