import React from "react";
import { UserContextInterface } from "../App";
// Creates and exports a React Context object that is used to store global variables
const UserContext = React.createContext<UserContextInterface | undefined>(
  undefined
);

export default UserContext;
