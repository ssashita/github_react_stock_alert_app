import React, { Component } from "react"
import { connect } from "react-redux"
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableHeader } from "material-ui";
import axios from "axios"
import constants from "../constants";
import { Button, IconButton, Fab } from "@material-ui/core";
import { ActionDelete, ContentRemoveCircle, ActionAccountCircle } from "material-ui/svg-icons";
import { Delete } from "@material-ui/icons"
import AddIcon from "@material-ui/icons/Add";
import ReactDOM from "react-dom";
import AddStockAlertDialog from "../components/AddStockAlertDialog"
import ProviderContext from "../components/ProviderContext";
import channel from "../broadcastchannel";

const AppContext = ProviderContext.context;

const mapStateToProps = (state, ownProps) => {
    return {
        currentUserInfo: state.userRegisterReducer.currentUserInfo,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setAlerts: (alerts) => {
            dispatch({ type: constants.SET_ALERTS, value: alerts });
        },
        removeAlert: (i) => {
            dispatch({
                type:
                    constants.REMOVE_ALERT,
                value: i
            });
        }
    };
};
const getStockAlerts = (userid, props) => {
    return axios
        .get(constants.BASE_SERVER_URL + constants.MY_ALERTS, {
            params: { userid: userid }
        })
        .then(resp => {
            if (resp.status === 200) {
                if (resp.data) {
                    props.setAlerts(resp.data.data.map(objFromAlertKey));
                    resp.data.data.forEach(alertKey => {
                        let alertKeySansUserId = alertKey.split('_').slice(0, -1).join('_');
                        channel.postMessage({ cmd: constants.SUBSCRIBE_TOPIC, topic: alertKeySansUserId})
                    })
                }
            }
        })
        .then(null, err => {
            console.log(err);
        });
};
const objFromAlertKey = (alertKey) => {
    let tokens = alertKey.split('_');
    return { id: alertKey, symbol: tokens[0], exchange: tokens[1], condition: tokens[2], price: tokens[3] }
};
const deleteAlert = (i, id, userid, props) => () => {
    let alertKeySansUserId = id.split('_').slice(0, -1).join('_');
    channel.postMessage({ cmd: constants.UNSUBSCRIBE_TOPIC, topic: alertKeySansUserId });
  axios
    .delete(constants.BASE_SERVER_URL + constants.DEL_ALERT, {
      params: { userid: userid, alertid: id }
    })
    .then(resp => {
      if (resp.status === 200) {
        props.removeAlert(i);
      } else {
        console.log("server error deleting");
      }
    })
    .then(null, err => console.log(err));
};
class StockAlerts extends Component {
    componentWillMount = () => {
        let userInfo = this.props.currentUserInfo;
        if (!userInfo.alerts) {
          userInfo.alerts = [];
        }
        getStockAlerts(userInfo.userid, this.props);
    }
    handleAddIconClick = () => {
        let open = true;
        ReactDOM.render(
          <AddStockAlertDialog
            open={() => open}
            dismiss={() => {
                open = false;
                this.forceUpdate(() => {
                    console.log("forcing update of Alerts")
                });
            }}
          />,
          document.getElementById("stockpalalertbox")
        );
    }
    render = () => {
        let userInfo = this.props.currentUserInfo;
        let alerts = userInfo.alerts;
        return (
          <React.Fragment>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Exchange</TableCell>
                    <TableCell>Condition</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>
                      <Fab
                        onClick={this.handleAddIconClick}
                        color="primary"
                      >
                        <AddIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userInfo.alerts.map((alert, i) => (
                    <TableRow key={i}>
                      <TableCell>{alert.symbol}</TableCell>
                      <TableCell> {alert.exchange}</TableCell>
                      <TableCell>{alert.condition}</TableCell>
                      <TableCell>{alert.price}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={deleteAlert(
                            i,
                            alert.id,
                            userInfo.userid,
                            this.props
                          )}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { context: AppContext })(StockAlerts)