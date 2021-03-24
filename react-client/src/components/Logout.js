import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

function Logout(props) {
  const [status, setStatus] = useState("signedOut");

  //check if the user already logged-in to show the logout button
  const readCookie = async () => {
    try {
      const res = await axios.get("/api/read_cookie");

      if (res.data.screen !== undefined) {
        if (res.data.screen !== "auth") {
          if (res.data.id) {
            setStatus("signedIn");
            console.log(status);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    const res = await axios.get("/api/signout");
    if (res.data.message === "signed out") {
      props.history.push("/login");
    }
    readCookie();
  };

  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render

  return (
    <div>
      {status === "signedIn" ? (
        <Button variant="danger" onClick={logOut}>
          Log out
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default withRouter(Logout);
