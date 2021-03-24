import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import Button from "react-bootstrap/Button";

function ListCourses(props) {
  const [courses, setCourses] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(apiUrl)
        .then((result) => {
          console.log("result.data:", result.data);
          //check if the user has logged in
          //if(result.data.screen !== 'auth')
          //{

          console.log("data in if:", result.data);
          setCourses(result.data);
          setShowLoading(false);
          //}
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
        });
    };
    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: "/showarticle/" + id,
    });
  };

  const enrollInCourse = (id) => {
    props.history.push({
      pathname: "/showarticle/" + id,
    });
  };

  const deleteCourse = (id) => {};

  //check if the user already logged-in
  // const readCookie = async () => {
  //   try {
  //     console.log("--- in readCookie function ---");

  //     //
  //     const res = await axios.get("/api/read_cookie");
  //     //
  //     if (res.data.screen !== undefined) {
  //       if (res.data.screen !== "auth") {
  //         if (res.data.id) {
  //           console.log(res.data.id);
  //           props.history.push("/showStudentDetails/" + res.data.id);
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   readCookie();
  // }, []);

  return (
    <div>
      {/* {courses.length !== 0 ? ( */}
      <div>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
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
                  <Button
                    variant="success"
                    onClick={() => {
                      deleteCourse(item._id);
                    }}
                  >
                    Delete Course
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ) : (
        <Login />
      )} */}
    </div>
  );
}
//
export default withRouter(ListCourses);
