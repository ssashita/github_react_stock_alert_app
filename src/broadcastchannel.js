import React, { Component } from "react"
import ReactDOM from "react-dom"
import Alert from "./components/Alert"
import ProviderContext from "./components/ProviderContext";
import constants from "./constants";

const store = ProviderContext.store;

// Connect to the channel named "my_bus".
const channel = new BroadcastChannel('my_bus');

// Send a message on "my_bus".
channel.postMessage('This is a test message.');

// Listen for messages on "my_bus".
channel.onmessage = function (e) {
    console.log('Received', e.data);
    let open = true;
    const { event } = e.data;
    switch (event) {
        case constants.STOCK_ALERT_HIT:
            const { alertkey , askprice, bidprice, ltp } = e.data;
            console.log(store.getState());
            const userid = store.getState().userRegisterReducer
                .currentUserInfo.userid;
            const alertKeyWithUserid = constants.alertKeyToAlertUseridKey(alertkey, userid);
            const { price, symbol, exchange, direction } = constants.infoFromAlertKey(alertkey);
            ReactDOM.render(
                <Alert
                    open={() => open}
                    dismiss={() => {
                        open = false;
                    }}
                    title="Alert Hit"
                    contentText={`${symbol} moved ${direction} ${price} at exchange ${exchange}`}
                />,
                document.getElementById("stockpalalertbox")
            );
            store.dispatch({type:constants.REMOVE_ALERT_BY_KEY, value: alertKeyWithUserid});
            break;
        default:
            break;
    }

};

export default channel;