import logo from "./logo.svg";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";

import ListStudents from "./components/ListStudents";
import CreateStudent from "./components/CreateStudent";
import ShowStudentDetail from "./components/ShowStudentDetails";
import ListCourses from "./components/ListCourses";
import CreateCourse from "./components/CreateCourse";
import ListStudentsByCourse from "./components/ListStudentsByCourse";
import Home from "./components/Home";
import Login from "./components/Login";
import ListStudentsInCourse from "./components/ListStudentsInCourse";
import EditCourse from "./components/EditCourse";

/*
 * Name: Anmoldeep Singh Gill, Mohammad bakir
 * Student Number: 301044883, 300987420
 */

function App() {
  return (
    <Router>
      <div className="card-container">
        <Navbar bg="dark" variant="dark" expand="lg">
          <img
            className="navbar-image"
            src={process.env.PUBLIC_URL + "/centennial_logo.png"}
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="navLinks" href="/home">
                Home
              </Nav.Link>
              <Nav.Link className="navLinks" href="/login">
                Login
              </Nav.Link>
              <Nav.Link className="navLinks" href="/listStudents">
                List All Students
              </Nav.Link>
              <Nav.Link className="navLinks" href="/listCourses">
                List All Courses
              </Nav.Link>
              <Nav.Link className="navLinks" href="/listStudentsByCourse">
                List Students By Course
              </Nav.Link>
              <Nav.Link className="navLinks" href="/signUp">
                Sign Up
              </Nav.Link>
              {/* <Logout /> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          <Route exact render={() => <Home />} path="/" />
          <Route render={() => <Home />} path="/home" />
          <Route render={() => <Login />} path="/login" />
          <Route render={() => <ListStudents />} path="/listStudents" />
          <Route render={() => <CreateStudent />} path="/signUp" />
          <Route
            render={() => <ShowStudentDetail />}
            path="/showStudentDetails"
          />
          <Route render={() => <ListCourses />} path="/listCourses" />
          <Route render={() => <CreateCourse />} path="/addCourse" />
          <Route render={() => <EditCourse />} path="/editCourse/:id" />
          <Route
            render={() => <ListStudentsInCourse />}
            path="/listStudentInCourse/:id"
          />
          <Route
            render={() => <ListStudentsByCourse />}
            path="/listStudentsByCourse"
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
