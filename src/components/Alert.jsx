import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContentText from "@material-ui/core/DialogContentText"
import { statement } from "@babel/template";
import React, { Component } from "react"
import Button from "@material-ui/core/Button"

export default 
    class extends Component{
    state = { };
    handleOk = () => {
        this.props.dismiss()
        this.setState(this.state) //to ensure update
        };
    render = () => {
            return (
                <Dialog open={this.props.open()} >
                    <DialogTitle >{this.props.title}</DialogTitle>
                    <DialogContent >
                        <DialogContentText>
                            {this.props.contentText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleOk}>OK</Button>
                    </DialogActions>
                </Dialog>
            )
        }
}