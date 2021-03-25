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

function ListStudentsByCourse(props) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({
    _id: "",
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
  });
  const [state, setState] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:3000/api/studentsByCourse/";
  const courseApiUrl = "http://localhost:3000/api/courses";

  useEffect(() => {
    // fetch all courses list to populate dropdown
    fetchAllCourses();
  }, []);

  // when the courses list is fetched set te dropdown to first value
  // and get the students for that first course
  const fetchAllCourses = async () => {
    axios
      .get(courseApiUrl)
      .then((result) => {
        console.log("result.data:", result.data);
        //check if the user has logged in
        if (result.data.screen !== "auth") {
          console.log("data in if:", result.data);
          setCourses(result.data.courses);
          fetchData(result.data.courses[0]._id);
          setCourse(result.data.courses[0]);
          setShowLoading(false);
        } else {
          setState("signedOut");
        }
      })
      .catch((error) => {
        setShowLoading(false);
        console.log("error in fetchData:", error);
      });
  };

  // fteched the students enrolled in ourse by course id
  const fetchData = async (id) => {
    axios
      .get(apiUrl + id)
      .then((result) => {
        console.log("result.data:", result.data);
        //check if the user has logged in
        if (result.data.screen !== "auth") {
          console.log("data in if:", result.data);
          setStudents(result.data);
          setShowLoading(false);
        } else {
          setState("signedOut");
        }
      })
      .catch((error) => {
        setShowLoading(false);
        console.log("error in fetchData:", error);
      });
  };

  // triggers when the selection is changed in course selection dropdown
  const onCourseSelectchange = (event) => {
    fetchData(event.target.value);
    setCourse(courses.find((c) => c._id === event.target.value));
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
            style={{ marginTop: "35px", marginBottom: "35px" }}
          >
            <div className="col-6 text-right label-bold">Select Course:</div>
            <div className="col-6">
              <select className="form-select" onChange={onCourseSelectchange}>
                {courses.map((c, ind) => (
                  <option key={ind} value={c._id}>
                    {c.courseName} ({c.courseCode})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className="row justify-content-center"
            style={{ marginTop: "35px", marginBottom: "35px" }}
          >
            <h2>
              All Students Enrolled in {course.courseName} ({course.courseCode})
            </h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Student Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Program</th>
                <th>Address</th>
                <th>City</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.studentNumber}</td>
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.program}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.phoneNumber}</td>
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
export default withRouter(ListStudentsByCourse);
