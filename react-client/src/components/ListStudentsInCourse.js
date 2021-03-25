import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import Button from "react-bootstrap/Button";

function ListStudentsInCourse(props) {
  const [students, setStudents] = useState([]);
  const [state, setState] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl =
    "http://localhost:3000/api/coursesByStudent/" + props.match.params.id;

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
          setStudents(result.data);
          setShowLoading(false);
        } else {
          setState("signedOut");
        }
      })
      .catch((error) => {
        console.log("error in fetchData:", error);
      });
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
            <h2>All Students Enrolled in The course</h2>
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
export default withRouter(ListStudentsInCourse);
