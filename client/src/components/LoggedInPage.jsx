import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { signOut } from "../api/firebase";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";

function LoggedInUI({ children }) {
  const { user, setUser } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReportIssue = () => {
    handleClose();
    // use window vs React Router API since this page isn't managed in React
    window.open(process.env.PUBLIC_URL + "/contact-us", "_blank");
  };
  const handleLogout = async () => {
    handleClose();

    await signOut();
    setUser(undefined);
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          style={{ flexDirection: "column-reverse", alignItems: "flex-end" }}
        >
          <IconButton style={{ marginRight: "10px" }} onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="ellipsis-menu"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            getContentAnchorEl={null}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleReportIssue}>Contact Us</MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleLogout();
              }}
            >
              Log Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}

export default LoggedInUI;
