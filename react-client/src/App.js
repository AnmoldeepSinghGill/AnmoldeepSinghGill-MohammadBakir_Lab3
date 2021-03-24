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
import List from "./components/List";
import EditStudent from "./components/EditStudent";
import EditArticle from "./components/EditArticle";

import CreateStudent from "./components/CreateStudent";
import ShowStudentDetail from "./components/ShowStudentDetails";
import ShowArticle from "./components/ShowArticle";

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
              <Nav.Link href="/list">List of Users</Nav.Link>
              <Nav.Link href="/createStudent">Sign Up</Nav.Link>
              <Logout />
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          <Route render={() => <Home />} path="/home" />
          <Route render={() => <Login />} path="/login" />
          <Route render={() => <List />} path="/list" />
          <Route render={() => <EditStudent />} path="/editStudent/:id" />
          <Route render={() => <CreateStudent />} path="/createStudent" />
          <Route
            render={() => <ShowStudentDetail />}
            path="/showStudentDetails/:id"
          />
          <Route render={() => <ShowArticle />} path="/showarticle/:id" />
          <Route render={() => <EditArticle />} path="/editarticle/:id" />
        </div>
      </div>
    </Router>
  );
}

export default App;
