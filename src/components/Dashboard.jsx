import React, { Component } from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import TextField from "@material-ui/core/TextField"
import { Dialog, Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"
import { validate } from '@babel/types';
import constants from "../constants.js"
import axios from "axios";
import Alert from "../components/Alert";

const mapStateToProps = (state, ownProps) => {
    return {
        currentUserInfo: state.userRegisterReducer.currentUserInfo,
        cookies: ownProps.cookies
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // fieldChanged: (name, value) =>
        //     dispatch({
        //         type: constants.FIELD_CHANGED,
        //         value: { name: name, value: value }
        //     }),
        // userIsRegistered: () =>
        //     dispatch({ type: constants.USER_REGISTER_FORM_SUBMIT })
    };
}

export default (props) => 
    (
        <React.Fragment>

        </React.Fragment>
    )

