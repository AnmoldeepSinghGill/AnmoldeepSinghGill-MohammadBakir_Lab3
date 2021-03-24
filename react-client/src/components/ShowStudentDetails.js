import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

function ShowUser(props) {
  const [data, setData] = useState({});
  const [courses, setCourses] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/students/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setCourses(result.data.courses);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editUser = (id) => {
    props.history.push({
      pathname: "/edit/" + id,
    });
  };

  const deleteUser = (id) => {
    setShowLoading(true);
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password,
    };

    axios
      .delete(apiUrl, user)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/list");
      })
      .catch((error) => setShowLoading(false));
  };

  const showCourses = () => {
    props.history.push("/listCourses");
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <h1>
          Name: {data.firstName}, {data.lastName}
        </h1>
        <p>Email: {data.email}</p>
        <p>Student Number: {data.studentNumber}</p>

        {/* <p>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              editUser(data._id);
            }}
          >
            Edit
          </Button>
          &nbsp;
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              deleteUser(data._id);
            }}
          >
            Delete
          </Button>
        </p> */}

        <p>Your Courses</p>
        <ListGroup>
          {courses.map((item, idx) => (
            <ListGroup.Item key={idx} action>
              {item._id}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button variant="success" onClick={showCourses}>
          Enroll in a New Course
        </Button>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowUser);
