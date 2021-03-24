import { withRouter } from "react-router-dom";
import ShowStudentDetail from "./ShowStudentDetails";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import axios from "axios";

function Home(props) {
  const [screen, setScreen] = useState("");
  // checking if the user is signed in
  const readCookie = async () => {
    try {
      const res = await axios.get("/api/read_cookie");

      if (res.data.screen) {
        if (res.data.screen !== "auth") {
          if (res.data.id) {
            setScreen("signedIn");
            console.log(status);
          }
        } else {
          setScreen("signedOut");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div>
      <h2>Student Course System</h2>
      {screen === "signedIn" ? <ShowStudentDetail /> : <Login />}
    </div>
  );
}

export default withRouter(Home);
