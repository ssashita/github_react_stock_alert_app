import React from "react";
import constants from "../constants";
import initialState from "../store/initialstore";

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case constants.SET_TAB_CONTENT:
            console.log(action);
            newState.currentActiveTab = action.value;
            break;

    }
    return newState;
};

export default reducer;
