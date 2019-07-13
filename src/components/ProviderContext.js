import React from "react";
import { createStore, combineReducers } from "redux";
import userRegisterReducer from "../reducers/UserRegisterReducer.js";
import tabSwitchReducer from "../reducers/TabContentSwitch";
import symbolInfoReducer from "../reducers/SymbolInfoReducer";
const multiReducers = combineReducers({ userRegisterReducer, tabSwitchReducer, symbolInfoReducer });
let store = createStore(multiReducers);
let context = React.createContext({store:store}); 
const obj = {store: store, context: context}
export default obj;

