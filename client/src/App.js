import io from "socket.io-client";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WaitlistPage from "./pages/WaitlistPage";
import Call from "./pages/Call";
import SignInPage from "./pages/SignInPage";
import loadGapiClient from "./utils/loadGapiClient";
import "./App.css";

function App() {
  const socketURL =
    process.env.NODE_ENV === "development" ? "http://localhost:8000" : "/";

  const initSocket = () => {
    let socket = io(socketURL);
    socket.on("connect", () => console.log("Connected"));
  };

  useEffect(() => {
    loadGapiClient(window);
    initSocket();
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <SignInPage />
          </Route>
          <Route exact path="/call">
            <Call />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
