import { useEffect, useState, useContext } from "react";
import UserContext from "./context/UserContext";
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
import CallPage from "./pages/CallPage";
import SignInPage from "./pages/SignInPage";

import "./App.css";
import axios from "axios";
import Loading from "./components/Loading";
import CreateProfilePage from "./pages/CreateProfilePage";

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [newUser, setNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const globals: UserContextInterface = {
    user,
    setUser,
    newUser,
    setNewUser,
    loading,
    setLoading,
  };

  const fetchUser = async () => {
    const res = await axios.get("/api/current_user");
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, [loading]);

  // useEffect(() => {
  //   auth.onAuthStateChanged((activeUser) => {
  //     if (activeUser) {
  //       getUser(activeUser.email).then((user) => {
  //         setUser(user);
  //       });
  //     }
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const theme = createTheme({
    typography: {
      // override Material UI default of Roboto
      //fontFamily: '"Roboto", sans-serif',
      fontFamily: '"Inter", sans-serif',
    },
  });

  console.log(user);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={globals}>
          {loading ? (
            <Loading />
          ) : (
            <Router>
              <Route
                exact
                path="/"
                render={(props) =>
                  newUser ? (
                    <CreateProfilePage />
                  ) : user ? (
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
                {newUser ? (
                  <CreateProfilePage />
                ) : user ? (
                  <CallPage />
                ) : (
                  <SignInPage />
                )}
              </Route>
            </Router>
          )}
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  profile: string;
}

export interface UserContextInterface {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  newUser: boolean;
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export default App;
