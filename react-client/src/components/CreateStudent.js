import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withRouter } from "react-router-dom";

function CreateUser(props) {
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    studentNumber: "",
    password: "",
    address: "",
    city: "",
    phoneNumber: "",
    program: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/student";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      studentNumber: +user.studentNumber,
      address: user.address,
      city: user.city,
      phoneNumber: user.phoneNumber,
      program: user.program,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        console.log(result);
        props.history.push("/login");
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <Container>
          <Row className="justify-content-center">
            <h2 className="page-header">Sign Up</h2>
          </Row>
          <Row>
            <Col sm="2"></Col>
            <Col sm="8">
              <Form onSubmit={saveUser}>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label> First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter first name"
                      value={user.firstName}
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label> Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter last name"
                      value={user.lastName}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    id="email"
                    rows="3"
                    placeholder="Enter email"
                    value={user.email}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Student Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="studentNumber"
                    id="studentNumber"
                    placeholder="Enter your student number"
                    value={user.studentNumber}
                    onChange={onChange}
                    maxLength="9"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Program</Form.Label>
                  <Form.Control
                    type="text"
                    name="program"
                    id="program"
                    placeholder="Enter your program"
                    value={user.program}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter Address"
                    value={user.address}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label> City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter City"
                      value={user.city}
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label> Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Enter your Phone Number"
                      value={user.phoneNumber}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Form.Row>

                <Row className="justify-content-center">
                  <Button variant="success" type="submit">
                    Sign Up
                  </Button>
                </Row>
              </Form>
            </Col>
            <Col sm="2"></Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateUser);
