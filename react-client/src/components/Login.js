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
      if (res.data.id !== undefined) {
        props.history.push("/showStudentDetails");
        console.log(res.data.id);
      }
    } catch (e) {
      //print the error
      console.log(e);
    }
  };

  //check if the user already logged-in
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
            props.history.push("/showStudentDetails/" + res.data.id);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      <div>
        <Row>
          <Col sm="2"></Col>
          <Col sm="8">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                id="email"
                rows="3"
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
