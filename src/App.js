import React from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import CssBaseline from "@material-ui/core/CssBaseline"
import RegisterUser from "./components/RegisterUser.jsx"
import { withCookies } from "react-cookie";
import constants from "./constants"
import Tab from "@material-ui/core/Tab"
import { connect } from "react-redux";
import Home from "./components/Home"
import ProviderContext from "./components/ProviderContext";

const AppContext = ProviderContext.context;


const mapDispatchToProps = dispatch => {
    return {
        setCurrentUserInfo: value => {
            return dispatch({
                type: constants.SET_CURRENT_USER_INFO,
                value: value
            })
        },
        setTabContent: value => {
            return dispatch({
                type: constants.SET_TAB_CONTENT,
                value: value
            });
        }
    }
};
function App(props) {
    let cookieObj = props.cookies.get(constants.STOCKPAL_INFO_COOKIE);
    const currentUserInfo = cookieObj && cookieObj.currentUserInfo;
    const getUserIsRegistered = () => {
        //cookieObj = cookieObj && JSON.parse(cookieObj);
        return (currentUserInfo && true) || false;

    };
    if (currentUserInfo) {
        props.setCurrentUserInfo(currentUserInfo);
    }
    return (
      <React.Fragment>
        {getUserIsRegistered() ? (
          <React.Fragment>
            <CssBaseline />
            <div>
              <NavBar
                currentUserInfo={currentUserInfo}
                setTabContent={props.setTabContent}
              />
            </div>
            {/* <div>
              <Dashboard >
                gjhgjg
              </Dashboard>
            </div> */}
            <Home
              setTabContent={props.setTabContent}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CssBaseline />
            <div>
              <NavBar  />
            </div>
            <div>
              <RegisterUser
                cookies={props.cookies}
              />
            </div>
          </React.Fragment>
        )}
        <div id="stockpalalertbox"  />
      </React.Fragment>
    );
};

export default connect(null,mapDispatchToProps,null,{context: AppContext})(withCookies(App));
