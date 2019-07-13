import React from "react"
import constants from "../constants";
import initialState from "../store/initialstore"

const reducer = (state = initialState, action) => {
    const newState = { ...state };
    let userinfo = newState.currentUserInfo;

    switch (action.type) {
        case constants.FIELD_CHANGED:
            console.log(action);
            newState.currentUserInfo[action.value.name]=action.value.value;
            break;
        case constants.USER_REGISTER_FORM_SUBMIT:
            console.log(newState);
            newState.userRegistered = true;
            break;
        case constants.SET_CURRENT_USER_INFO:
            newState.currentUserInfo = action.value;
            break;
        case constants.SET_ALERTS:
            newState.currentUserInfo = Object.assign({},newState.currentUserInfo, { alerts: action.value });
            break;
        case constants.REMOVE_ALERT:
            userinfo.alerts.splice(action.value, 1);
            newState.currentUserInfo = Object.assign({},userinfo);
            break;
        case constants.REMOVE_ALERT_BY_KEY:
            let alertsLst = newState.currentUserInfo.alerts;
            userinfo.alerts=alertsLst.filter(
              obj => action.value !== obj.id
            );
            newState.currentUserInfo = Object.assign({}, userinfo);
            break;
        case constants.CREATE_ALERT:
            const v = action.value;
            let alerts = newState.currentUserInfo.alerts;
            let data = {
                symbol: v.symbol,
                exchange: v.exchange,
                condition: v.abovebelow,
                price: v.price,
                id: v.alertUseridKey
            };
            alerts.push(data);
            break;
        default:
            break;
    }
    return newState;
};

export default reducer;
