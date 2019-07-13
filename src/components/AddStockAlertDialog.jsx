import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import constants from "../constants";
import { TextField } from "@material-ui/core";
import Alert from "../components/Alert";
import ReactDOM from "react-dom";
import axios from "axios";
import ProviderContext from "../components/ProviderContext";
import { MenuItem } from "material-ui";
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PaginatedAutoSuggest from "../components/PaginatedAutoSuggest";
import { setTimeout } from "timers";
import Typography from "@material-ui/core/Typography";
import channel from "../broadcastchannel";

const AppContext = ProviderContext.context;
const mapStateToProps = (state, ownprops) => {
    return {
        userinfo: state.userRegisterReducer.currentUserInfo,
        symbolsInfo: state.symbolInfoReducer.symbolInfo,
        searchResults: () => state.symbolInfoReducer.searchResults
    };
};
const mapDispatchToProps = dispatch => {
  return {
    getSymbolsInfo: query => {
      dispatch({ type: constants.SYMBOLS_INFO, value: query });
    },
    createAlert: alertObj => {
      dispatch({ type: constants.CREATE_ALERT, value: alertObj });
      },
      getAllSymbols: () => dispatch({type:constants.GET_ALL_SYMBOLS})
  };
};
const renderSymbolSuggestion = suggestion => {
    return (
      <MenuItem value={suggestion.symbol}>
        <Typography variant="h6">{suggestion.symbol}</Typography>
        <Typography variant="caption">{suggestion.exchange}</Typography>
        <Typography variant="caption">{suggestion.name}</Typography>
      </MenuItem>
    );
};
class AddStockAlertDialog extends Component {
  state = {
    open: true,
    symbol: "",
    direction: constants.directions[0],
    price: "",
    exchange: constants.exchanges[0]
  };
  componentWillMount = () => {
    console.log("componentwillmount");
    this.props.getAllSymbols();
  };
  handleChange = evt => {
    let newState = { [evt.target.name]: evt.target.value };
    this.setState(newState);
  };
  handleSymbolChange = name => (evt, { suggestionValue }) => {
    this.setState({ [name]: suggestionValue });
  };
  handleOk = () => {
    let st = this.state;
    let data = {
      symbol: st.symbol,
      exchange: st.exchange,
      abovebelow: st.direction,
      price: st.price,
      userid: this.props.userinfo.userid
    };
    if (!st.symbol || !st.price || !st.direction || !st.exchange) {
      let open = true;
      ReactDOM.render(
        <Alert
          open={() => open}
          dismiss={() => {
            open = false;
          }}
          title="Error"
          contentText="Required fields not filled"
        />,
        document.getElementById("stockpalalertbox")
      );
    } else {
      let open = true;
      let error;
      axios.post(constants.BASE_SERVER_URL + constants.CREATE_ALERT, data).then(
        resp => {
          if (resp.data && resp.data.status === "success") {
            let obj = resp.data.data;
            if (obj) {
                this.props.createAlert(obj);
                channel.postMessage({cmd:constants.SUBSCRIBE_TOPIC,topic:obj.alertKey})
              ReactDOM.render(
                <Alert
                  open={() => open}
                  dismiss={() => {
                    open = false;
                  }}
                  title="Success"
                  contentText="Alert created !"
                />,
                document.getElementById("stockpalalertbox")
              );
              this.props.dismiss();
            } else {
              error = "Empty alert object reurned";
            }
          } else {
            error = "Error creating alert";
            console.log("Error creating alert");
          }
        },
        err => {
          error = err;
          console.log(err);
        }
      );
      if (error) {
        ReactDOM.render(
          <Alert
            open={() => open}
            dismiss={() => {
              open = false;
            }}
            title="Error"
            contentText={error.msg || error}
          />,
          document.getElementById("stockpalalertbox")
        );
      }
    }
  };
  handleCancel = () => {
    this.props.dismiss();
    this.setState(this.state); //to ensure update
  };
  querySymbols = query => {
    this.props.getSymbolsInfo(query);
    return new Promise((succ, fail) => {
      setTimeout(() => {
        return this.props.searchResults().then(
          results => {
            console.log(results);
            succ(
              results.map(obj => ({
                ...obj,
                text: obj.symbol + " " + obj.exchange + " " + obj.name
              }))
            );
          },
          err => fail(err)
        );
      });
    });
  };
  render = () => {
    const boundHandleChange = this.handleChange.bind(this);
    return (
      <React.Fragment>
        <Dialog open={this.props.open()}>
          <DialogTitle>{"Add Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {"Fill the following fields to add a stock alert"}
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <div>
              <MuiThemeProvider>
                <PaginatedAutoSuggest
                  onChange={this.handleSymbolChange("symbol")}
                  getSymbolsFromQuery={this.querySymbols}
                  placeholder={"Enter Query for searching Symbol"}
                  renderSuggestion={renderSymbolSuggestion}
                />
              </MuiThemeProvider>
            </div>
            <MuiThemeProvider>
              <div style={{ marginTop: "10px" }}>
                <InputLabel htmlFor="symbolexchange">Exchange</InputLabel>
                <Select
                  name="exchange"
                  inputProps={{ name: "exchange", id: "symbolexchange" }}
                  value={this.state.exchange}
                  required
                  onChange={this.handleChange}
                  style={{ marginLeft: "10px" }}
                >
                  <MenuItem value={constants.exchanges[0]}>
                    {constants.exchanges[0]}
                  </MenuItem>
                  <MenuItem value={constants.exchanges[1]}>
                    {constants.exchanges[1]}
                  </MenuItem>
                  <MenuItem value={constants.exchanges[2]}>
                    {constants.exchanges[2]}
                  </MenuItem>
                  <MenuItem value={constants.exchanges[3]}>
                    {constants.exchanges[3]}
                  </MenuItem>
                </Select>
              </div>
            </MuiThemeProvider>
            <div>
              <MuiThemeProvider>
                <div style={{ marginTop: "10px" }}>
                  <InputLabel htmlFor="symbolmoves">Moves</InputLabel>
                  <Select
                    name="direction"
                    inputProps={{ name: "direction", id: "symbolmoves" }}
                    value={this.state.direction}
                    required
                    onChange={this.handleChange}
                    style={{ marginLeft: "10px" }}
                  >
                    <MenuItem value={constants.directions[0]}>
                      {constants.directions[0]}
                    </MenuItem>
                    <MenuItem value={constants.directions[1]}>
                      {constants.directions[1]}
                    </MenuItem>
                  </Select>
                </div>
              </MuiThemeProvider>
            </div>
            <div>
              <TextField
                type="number"
                name="price"
                required
                label={"Price"}
                onChange={this.handleChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOk}>OK</Button>
            <Button onClick={this.handleCancel}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { context: AppContext }
)(AddStockAlertDialog);
