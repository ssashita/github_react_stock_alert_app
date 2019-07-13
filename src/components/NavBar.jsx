import React from "react";
import ToolBar from "@material-ui/core/Toolbar";
import { AppBar,  Typography, Menu,IconButton } from "@material-ui/core";
//import logo from "./logo.svg";
import RouterMenu from "./RouterMenu"
import { spacing } from '@material-ui/system'
//import { unstable_Box as Box } from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import { connect } from 'react-redux'
import constants from '../constants'
import ProviderContext from "../components/ProviderContext";

const AppContext = ProviderContext.context;

const mapStateToProps = (state, ownProps) => {
    return {
        currentUserInfo: state.userRegisterReducer.currentUserInfo,
        currentActiveTab: state.tabSwitchReducer.currentActiveTab
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // setTabContent: value => {
        //     return dispatch({
        //       type: constants.SET_TAB_CONTENT,
        //       value: value
        //     });
        // }
    }
};
const NavBar = (props) => {

  return (
    <div className="navbar">
      <AppBar position="static">
        <ToolBar>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            direction="row"
            spacing={8}
          >
            <div>
              {/* <nav>
                <RouterMenu setTabContent={props.setTabContent} />
              </nav> */}
            </div>
            <Typography variant="title" color="inherit">
              Stock Pal{" "}
            </Typography>
          </Grid>
          <Grid container direction="row" justify="flex-end" alignItems="center"> 
            <Typography variant="subheading" color="inherit">
              {props.currentUserInfo && props.currentUserInfo.name}
            </Typography>
          </Grid>
        </ToolBar>
      </AppBar>
    </div>
  );
};
export default connect(
  mapStateToProps,
    mapDispatchToProps,
    null,
  {context: AppContext}
)(NavBar);
