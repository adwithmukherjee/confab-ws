import io from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import UserContext from "./context/UserContext";
import { auth, getUser } from "./api/firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import LoggedInPage from "./components/LoggedInPage";
import HomePage from "./pages/HomePage";
import WaitlistPage from "./pages/WaitlistPage";
import Call from "./pages/Call";
import SignInPage from "./pages/SignInPage";
import loadGapiClient from "./utils/loadGapiClient";
import "./App.css";

function App() {
  const socketURL =
    process.env.NODE_ENV === "development" ? "http://localhost:8000" : "/";

  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const globals = {
    user,
    setUser,
    loading,
    setLoading,
  };

  const initSocket = () => {
    let socket = io(socketURL);
    socket.on("connect", () => console.log("Connected"));
  };

  useEffect(() => {
    loadGapiClient(window);
    //initSocket();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((activeUser) => {
      if (activeUser) {
        getUser(activeUser.email).then((user) => {
          setUser(user);
        });
      }
    });
  }, []);

  const theme = createTheme({
    typography: {
      // override Material UI default of Roboto
      fontFamily: '"Inter", sans-serif',
    },
  });

  return (
    <div style={{}}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={globals}>
          <Backdrop open={loading} style={{ zIndex: "100" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Router>
            <Route
              exact
              path="/"
              render={(props) =>
                user ? (
                  <LoggedInPage>
                    <HomePage />
                  </LoggedInPage>
                ) : (
                  <WaitlistPage />
                )
              }
            />
            <Route exact path="/login">
              {user ? <Redirect to="/" /> : <SignInPage />}
            </Route>
            <Route exact path="/call/:channelId">
              <Call />
            </Route>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
