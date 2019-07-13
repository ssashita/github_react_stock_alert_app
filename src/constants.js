export default {
  FIELD_CHANGED: 0,
  USER_REGISTER_FORM_SUBMIT: 1,
  BASE_SERVER_URL: "http://localhost:7776/",
  USER_REGISTER_REQUEST: "createuser",
  CREATE_SUBSCRIPTION_REQUEST: "createsubscription",
  CREATE_ALERT: "createalert",
  SEARCH_SYMBOL: "searchsymbol",
  ALL_ALERTS: "allalerts",
  MY_ALERTS: "myalerts",
  DEL_ALERT: "alert",
  SUBSCRIPTIONS: "subscriptions",
  STOCKPAL_INFO_COOKIE: "stockpal_cookie",
  //moscaConnectionString: "tcp://52.77.57.127:41385"
  moscaConnectionString: "ws://localhost:9003",
  SET_TAB_CONTENT: "settab_content",
  SET_CURRENT_USER_INFO: "set_current_user_info",
  ALERTS_TAB_NAME: "ALERTS",
  SUBSCRIPTIONS_TAB_NAME: "SUBSCRIPTIONS",
  ABOUT_TAB_NAME: "ABOUT",
  PROFILE_TAB_NAME: "PROFILE",
  SET_ALERTS: "setAlerts",
  REMOVE_ALERT: "removeAlert",
  SYMBOLS_INFO: "symbols_info",
  exchanges: ["NSE", "BSE", "CDS", "MCX"],
  directions: ["ABOVE", "BELOW"],
  GET_ALL_SYMBOLS: "getAllSymbols",
  SUBSCRIBE_TOPIC: "subscribeTopic",
  UNSUBSCRIBE_TOPIC: "unsubscribeTopic",
  STOCK_ALERT_HIT: "stockAlertHit",
  alertKeyToAlertUseridKey: (alertKey, userid) => alertKey + "_" + userid,
  infoFromAlertKey: alertKey => {
    const [symbol, exchange, direction, price] = alertKey.split("_");
    return { symbol, price, exchange, direction };
  },
  REMOVE_ALERT_BY_KEY: "removeAlertByKey"
};