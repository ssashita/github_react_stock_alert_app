import React, { Component } from 'react'
import ReactDOM from "react-dom"
import {connect} from 'react-redux'
import TextField from "@material-ui/core/TextField"
import { Dialog, Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"
import { validate } from '@babel/types';
import constants from "../constants.js"
import axios from "axios";
import Alert from "../components/Alert";
import ProviderContext from "../components/ProviderContext";

const AppContext = ProviderContext.context;

const mapStateToProps = (state, ownProps) => {
    return {
        showRegisterUserDialog:
            !state.userRegisterReducer ||
            !state.userRegisterReducer.userRegistered,
        currentUserInfo: state.userRegisterReducer.currentUserInfo,
        cookies: ownProps.cookies
    };
};
const mapDispatchToProps = dispatch => {
    return {
      fieldChanged: (name, value) =>
        dispatch({
          type: constants.FIELD_CHANGED,
          value: { name: name, value: value }
        }),
      userIsRegistered: () =>
        dispatch({ type: constants.USER_REGISTER_FORM_SUBMIT })
    };
}
const submitUserRegisterForm = (props) => {
    console.log("FORM submit");
    var open = true;
    axios.post(constants.BASE_SERVER_URL + constants.USER_REGISTER_REQUEST,
        {
            name: props.currentUserInfo.name,
            phonenumber: props.currentUserInfo.mobilenumber,
            address: props.currentUserInfo.address,
            mailid: props.currentUserInfo.emailid
        }).then(resp => {
            if (resp.status === 200) {
                //newState.userRegistered = true;
                props.userIsRegistered();
                console.log(resp.data.data);
                props.cookies.set(constants.STOCKPAL_INFO_COOKIE, JSON.stringify({currentUserInfo: resp.data.data}));
                ReactDOM.render((<Alert open={()=>open} dismiss={()=>{open=false}} title="title" contentText="content" />),document.getElementById("stockpalalertbox"))
            } else {
                ReactDOM.render(
                    <Alert open={()=>open} dismiss={() => { open = false }} title="title" contentText="content" />,
                  document.getElementById("stockpalalertbox")
                );
            }
        }, err => {
                ReactDOM.render(
                    <Alert open={()=>open} dismiss={() => { open = false }}
                    title="title error"
                    contentText="content error"
                  />,
                  document.getElementById("stockpalalertbox")
                );
        })

}
class RegisterUser extends Component {
    onClickHandler = (evt) => {
        console.log("onclick");
        console.log(this.props)
        submitUserRegisterForm(this.props)
        //validate();
    }
    onChangeHandler = evt => {
        console.log(evt.target.name);
        //this.setState(Object.assign(state, { changedTargetName:evt.target.name, changedTargetValue: evt.target.value }));
        this.props.fieldChanged(evt.target.name, evt.target.value);
    }
    render = () => {

        return (
          <React.Fragment>
            <Dialog fullWidth open={this.props.showRegisterUserDialog}>
              <Typography variant="h5" align="center">
                Register User
              </Typography>
              <TextField
                name="name"
                required
                label="Name"
                onChange={this.onChangeHandler.bind(this)}
              />
              <TextField
                name="mobilenumber"
                required
                label="Mobile Number"
                onChange={this.onChangeHandler.bind(this)}
              />
              <TextField
                name="emailid"
                required
                label="Email id"
                onChange={this.onChangeHandler.bind(this)}
                type="email"
                autoComplete="email"
              />
              <TextField
                name="address"
                required
                multiline
                rowsMax={4}
                margin="dense"
                label="Address"
                onChange={this.onChangeHandler.bind(this)}
              />
              <div align="center">
                <Button onClick={this.onClickHandler}>OK</Button>
              </div>
            </Dialog>
          </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps,null,{context: AppContext})(RegisterUser)