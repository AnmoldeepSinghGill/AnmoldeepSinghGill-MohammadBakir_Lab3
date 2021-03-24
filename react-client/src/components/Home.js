import { withRouter } from "react-router-dom";

import React, { Component } from "react";

function Home(props) {
  return (
    <div>
      <h2>Student Course System</h2>
      <a href="/login" class="btn btn-success">
        Login
      </a>
      <a href="/signUp" class="btn btn-success">
        Sign Up
      </a>
    </div>
  );
}

export default withRouter(Home);
