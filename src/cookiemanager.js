import React, { Component } from "react"
import { useCookies } from "react-cookie";
import constants from "./constants"

class CookieManager extends Component {
    getUserIsRegistered(){
        const [cookies] = useCookies([
            constants.STOCKPAL_INFO_COOKIE
        ]);
        const userIsRegistered = cookies[constants.STOCKPAL_INFO_COOKIE] &&
            cookies[constants.STOCKPAL_INFO_COOKIE].currentUserInfo;
        return userIsRegistered && true || false;

    };
    setCurrentUserInfo({ username, mobilenumber, emailid, address }){
        const [cookies, setCookie] = useCookies([
            constants.STOCKPAL_INFO_COOKIE
        ]);
        cookies[constants.STOCKPAL_INFO_COOKIE].currentUserInfo = setCookie(constants.STOCKPAL_INFO_COOKIE, JSON.stringify({ username, mobilenumber, address, emailid }));
    };
    
    render() {
        return null;
    }
}

export default { getUserIsRegistered: () => { } }