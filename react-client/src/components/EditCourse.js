import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";

/*
 * Name: Anmoldeep Singh Gill, Mohammad bakir
 * Student Number: 301044883, 300987420
 */

function EditCourse(props) {
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:3000/api/getCourse/" + props.match.params.id)
        .then((result) => {
          console.log("result.data:", result.data);
          setCourse(result.data);
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
        });
    };
    fetchData();
  }, []);

  const [course, setCourse] = useState({
    _id: "",
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
  });
  console.log("-> course", course);

  const [showLoading, setShowLoading] = useState(false);
  //
  const apiUrl = "http://localhost:3000/api/course/";
  //

  // save the edited data of course
  const saveCourse = (e) => {
    console.log(course);
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
    };
    axios
      .put(apiUrl + course._id, data)
      .then((result) => {
        setShowLoading(false);
        console.log("results from edit course:", result.data);
        props.history.push("/listCourses");
      })
      .catch((error) => setShowLoading(false));
  };

  // sets the value of the state when change in form values
  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="row justify-content-center" style={{ marginTop: "20px" }}>
        <h2> Edit Course</h2>
      </div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <Form onSubmit={saveCourse}>
          <Form.Group>
            <Form.Label> Course Code</Form.Label>
            <Form.Control
              type="text"
              name="courseCode"
              id="courseCode"
              placeholder="Enter Course Code"
              value={course.courseCode}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Course Name</Form.Label>
            <Form.Control
              type="text"
              name="courseName"
              id="courseName"
              placeholder="Enter Course Name"
              value={course.courseName}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Section</Form.Label>
            <Form.Control
              type="text"
              name="section"
              id="section"
              placeholder="Enter Section"
              value={course.section}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Semester</Form.Label>
            <Form.Control
              type="text"
              name="semester"
              id="semester"
              placeholder="Enter Semester"
              value={course.semester}
              onChange={onChange}
              required
            />
          </Form.Group>

          <div className="row justify-content-center">
            <Button variant="success" type="submit">
              Update Course
            </Button>
          </div>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditCourse);
