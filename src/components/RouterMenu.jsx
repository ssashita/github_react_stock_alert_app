import React from "react";
import ToolBar from "@material-ui/core/Toolbar";
import { AppBar, Typography, Menu, IconButton } from "@material-ui/core";
//import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Dashboard from "./Dashboard";
import About from "./About";
import Profile from "./Profile";
import MenuItem from "@material-ui/core/MenuItem"
import MenuIcon from "@material-ui/icons/MenuTwoTone"
import constants from "../constants";

class RouterMenu extends React.Component {
  state = { anchorEl: null, setTabContent: this.props.setTabContent };
  handleMenuSelect = evt => {
    try {
      this.setState({ anchorEl: null });
    } catch (e) {
      console.log(e);
    }
  };
  render = () => {
    return (
      <React.Fragment>
        <IconButton
          aria-owns="menu-appbar"
          aria-haspopup="true"
          onClick={evt => {
            this.setState({ anchorEl: evt.currentTarget });
          }}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Router>
          <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorEl}
            open={(this.state.anchorEl && true) || false}
          >
            <MenuItem onClick={this.handleMenuSelect}>
              {/* <Link to="/" onClick={this.handleMenuSelect}>
                    Home
                  </Link> */}
              Select...
            </MenuItem>
            <MenuItem>
              <Link
                to="/about/"
                onClick={evt => {
                    this.props.setTabContent(
                      constants.ABOUT_PAGE_NAME
                    );
                  this.handleMenuSelect(evt);
                }}
              >
                {constants.ABOUT_PAGE_NAME}
                
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/profile/"
                onClick={evt => {
                    this.props.setTabContent(
                      constants.PROFILE_PAGE_NAME
                    );
                  this.handleMenuSelect(evt);
                }}
              >
                {constants.PROFILE_PAGE_NAME}
                
              </Link>
            </MenuItem>
          </Menu>

          <Route
            path="/"
            exact
            render={routerprops => <Dashboard {...routerprops} {...this.props} />}
          />
          <Route path="/about/" component={About} />
          <Route path="/profile/" component={Profile} />
        </Router>
      </React.Fragment>
    );
  };
}
export default RouterMenu