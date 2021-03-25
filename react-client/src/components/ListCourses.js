import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import Button from "react-bootstrap/Button";

/*
 * Name: Anmoldeep Singh Gill, Mohammad bakir
 * Student Number: 301044883, 300987420
 */

function ListCourses(props) {
  const [courses, setCourses] = useState([]);
  const [state, setState] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:3000/api/courses/";
  const enrollCourseUrl = "http://localhost:3000/api/enrollCourse/";

  useEffect(() => {
    fetchData();
  }, []);

  // fetches the list of all the courses
  const fetchData = async () => {
    axios
      .get(apiUrl)
      .then((result) => {
        console.log("result.data:", result.data);
        //check if the user has logged in
        if (result.data.screen !== "auth") {
          console.log("data in if:", result.data);
          setCourses(result.data.courses);
          console.log(result.data.loggenInId);
          setStudentId(result.data.loggenInId);
          setShowLoading(false);
        } else {
          setState("signedOut");
        }
      })
      .catch((error) => {
        console.log("error in fetchData:", error);
      });
  };

  // adds the course in the student profile if already not present
  const enrollInCourse = (courseId) => {
    if (studentId) {
      axios
        .put(enrollCourseUrl + studentId + "/" + courseId)
        .then((result) => {
          setShowLoading(false);
          props.history.push("/showStudentDetails/");
        })
        .catch((error) => {
          console.log("error in enroll courses:", error);
          if (error.response.data.message) {
            setError(error.response.data.message);
          }
        });
    } else {
      setState("signedOut");
    }
  };

  // deletes a course by provided id
  const deleteCourse = (id) => {
    axios
      .delete(apiUrl + id)
      .then((result) => {
        setShowLoading(false);
        fetchData();
      })
      .catch((error) => {
        console.log("error in delete courses:", error);
      });
  };

  // navigate to edit course view
  const editCourse = (id) => {
    props.history.push({
      pathname: "/editCourse/" + id,
    });
  };

  // navigate to add new course view
  const addNewCourse = () => {
    props.history.push("/addCourse");
  };

  // navigate to list all students in a course view
  const listStudentsEnrolled = (id) => {
    props.history.push("/listStudentInCourse/" + id);
  };

  return (
    <div>
      {state !== "signedOut" ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {error !== "" && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div
            className="row justify-content-center"
            style={{ marginTop: "20px" }}
          >
            <h1>All Courses</h1>
          </div>
          <div
            className="row justify-content-end profileButtons"
            style={{ padding: "0 15px 20px 0" }}
          >
            <Button variant="success" onClick={addNewCourse}>
              Add New Course
            </Button>
          </div>
          {courses.map((course, idx) => (
            <div className="row justify-content-center" key={idx}>
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">{course.courseName}</h3>
                    <div className="row">
                      <div className="col-6">
                        <b>Code: </b> {course.courseCode}
                        <br />
                        <b>Section: </b> {course.section}
                        <br />
                        <b>Semester: </b> {course.semester}
                      </div>
                      <div
                        className="col-3"
                        style={{ borderRight: "1px solid #b1a9a9" }}
                      >
                        <div className="row justify-content-center">
                          <Button
                            variant="success"
                            onClick={() => {
                              enrollInCourse(course._id);
                            }}
                          >
                            Enroll Into this Course
                          </Button>
                        </div>
                        <div
                          className="row justify-content-center"
                          style={{ marginTop: "15px" }}
                        >
                          <Button
                            variant="success"
                            onClick={() => {
                              listStudentsEnrolled(course._id);
                            }}
                          >
                            List Students Enrolled
                          </Button>
                        </div>
                      </div>
                      <div className="col-3">
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
                              deleteCourse(course._id);
                            }}
                          >
                            Delete Course
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
//
export default withRouter(ListCourses);
