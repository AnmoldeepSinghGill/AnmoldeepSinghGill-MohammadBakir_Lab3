import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import Button from "react-bootstrap/Button";

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

  const editCourse = (id) => {
    props.history.push({
      pathname: "/editCourse/" + id,
    });
  };

  const addNewCourse = () => {
    props.history.push("/addCourse");
  };

  const listStudentsEnrolled = (id) => {
    props.history.push("listStudentByCourse/" + id);
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
          <div className="row justify-content-center">
            <h1>All Courses</h1>
          </div>
          <div className="row justify-content-end profileButtons">
            <Button variant="success" onClick={addNewCourse}>
              Add New Course
            </Button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Section</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.courseCode}</td>
                  <td>{item.courseName}</td>
                  <td>{item.section}</td>
                  <td>{item.semester}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => {
                        enrollInCourse(item._id);
                      }}
                    >
                      Enroll Into Course
                    </Button>
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteCourse(item._id);
                      }}
                    >
                      Delete Course
                    </Button>
                    &nbsp;
                    <Button
                      variant="warning"
                      onClick={() => {
                        editCourse(item._id);
                      }}
                    >
                      Edit Course
                    </Button>
                    &nbsp;
                    <Button
                      variant="success"
                      onClick={() => {
                        listStudentsEnrolled(item._id);
                      }}
                    >
                      List Students Enrolled
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
//
export default withRouter(ListCourses);
