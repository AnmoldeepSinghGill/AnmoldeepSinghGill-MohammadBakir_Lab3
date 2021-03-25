import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { withRouter } from "react-router-dom";
//
import View from "./View";
//
function App(props) {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState("auth");
  //store input field data, user name and password
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:3000/api/signin";
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log("calling auth");
    console.log(email);
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { email, password } };
      //call api
      const res = await axios.post(apiUrl, loginData);
      //process the response
      if (res.data.id) {
        props.history.push("/showStudentDetails");
        console.log(res.data.id);
      }
    } catch (e) {
      //print the error
      console.log(e);
      if (e.response.data.message) {
        setError(e.response.data.message);
      }
    }
  };

  // check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");

      //
      const res = await axios.get("/api/read_cookie");
      //
      if (res.data.screen !== undefined) {
        if (res.data.screen !== "auth") {
          if (res.data.id) {
            console.log(res.data.id);
            props.history.push("/showStudentDetails/");
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // runs on the first render
  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      <div>
        <Row>
          <Col sm="2"></Col>
          <Col sm="8">
            <div
              className="row justify-content-center"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <h2>Login</h2>
            </div>
            {error !== "" && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm="2"></Col>
        </Row>
        <Row className="justify-content-center">
          <Button variant="success" onClick={auth}>
            Login
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default withRouter(App);
