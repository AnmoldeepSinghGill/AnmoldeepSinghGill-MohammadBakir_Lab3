import logo from "./logo.svg";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "./App.css";
//
import ListStudents from "./components/ListStudents";
import EditStudent from "./components/EditStudent";
import EditArticle from "./components/EditArticle";

import CreateStudent from "./components/CreateStudent";
import ShowStudentDetail from "./components/ShowStudentDetails";
import ShowArticle from "./components/ShowArticle";

import ListCourses from "./components/ListCourses";
import CreateCourse from "./components/CreateCourse";

import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  return (
    <Router>
      <div className="card-container">
        <Navbar bg="light" expand="lg">
          {/* <div className="navbar-left">
            <img
              class="navbar-image"
              src={process.env.PUBLIC_URL + "/centennial_college_logo.png"}
            />
          </div> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/listStudents">List All Students</Nav.Link>
              <Nav.Link href="/signUp">Sign Up</Nav.Link>
              {/* <Logout /> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          <Route render={() => <Home />} path="/home" />
          <Route render={() => <Login />} path="/login" />
          <Route render={() => <ListStudents />} path="/listStudents" />
          <Route render={() => <EditStudent />} path="/editStudent/:id" />
          <Route render={() => <CreateStudent />} path="/signUp" />
          <Route
            render={() => <ShowStudentDetail />}
            path="/showStudentDetails"
          />
          <Route render={() => <ShowArticle />} path="/showarticle/:id" />
          <Route render={() => <EditArticle />} path="/editarticle/:id" />
          <Route render={() => <ListCourses />} path="/listCourses" />
          <Route render={() => <CreateCourse />} path="/addCourse" />
        </div>
      </div>
    </Router>
  );
}

export default App;
