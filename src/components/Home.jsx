import React from "react";
import ToolBar from "@material-ui/core/Toolbar";
import { AppBar, Typography, Menu, IconButton, Tab, Tabs } from "@material-ui/core";
//import logo from "./logo.svg";
import RouterMenu from "./RouterMenu"
import { spacing } from '@material-ui/system'
//import { unstable_Box as Box } from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import { connect } from 'react-redux'
import constants from '../constants'
import StockAlerts from "./StockAlerts";
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

    };
}
let selectedTabValue = 0;

const handleTabSelect = (props) => 
    (evt, value) => {
        //evt.currentTarget
        selectedTabValue = value;
        if (value === 0) {
            props.setTabContent(constants.ALERTS_TAB_NAME)
        } else if (value === 1) {
            props.setTabContent(constants.SUBSCRIPTIONS_TAB_NAME)
        } else if (value === 2) {
            props.setTabContent(constants.ABOUT_TAB_NAME)        
        } else if (value === 3) {
            props.setTabContent(constants.PROFILE_TAB_NAME)
        } else if (value === 4) {
            props.setTabContent(constants.NOTIFICATIONS_TAB_NAME)
        }
    }

const Home = (props) => {

    if (selectedTabValue === 0) {
      props.setTabContent(constants.ALERTS_TAB_NAME);
    }
    return (
      <React.Fragment>
        <Tabs value={selectedTabValue} onChange={handleTabSelect(props)}>
          <Tab label={constants.ALERTS_TAB_NAME} />
          <Tab label={constants.SUBSCRIPTIONS_TAB_NAME} />
          <Tab label={constants.ABOUT_TAB_NAME} />
          <Tab label={constants.PROFILE_TAB_NAME} />
        </Tabs>
        {props.currentActiveTab === constants.ALERTS_TAB_NAME && (
                <StockAlerts/>
        )}
        {props.currentActiveTab === constants.SUBSCRIPTIONS_TAB_NAME && (
          <Typography variant="h2">Subscriptions</Typography>
        )}
        {props.currentActiveTab === constants.ABOUT_TAB_NAME && (
          <Typography variant="h2">About</Typography>
        )}
        {props.currentActiveTab === constants.PROFILE_TAB_NAME && (
          <Typography variant="h2">Profile</Typography>
        )}
      </React.Fragment>
    );
}
export default connect(mapStateToProps, mapDispatchToProps,null,{context:AppContext})(Home)