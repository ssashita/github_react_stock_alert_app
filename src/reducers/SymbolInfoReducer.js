import constants from "../constants";
import axios from "axios";
const sortFunction = (a, b) => {
    if (a.type === b.type) {
        return a < b ? -1 : (a > b ? 1 : 0);
    }
    else if (a.type === 'EQ') {
        if (b.type !== 'EQ') {
            return -1;
        }
    } else if (a.type === 'FUT') {
        if (b.type === 'EQ') {
            return 1;
        } else {
            return -1;
        }
    } else {
        return 1;
    }
};
const reducer = (state = {symbolInfo:null},action) => {
    let newState = { ...state };
    switch (action.type) {
        case constants.SYMBOLS_INFO:
            // if (!action.value) {
            //     searchExp = "*"
            // } else {
            //     searchExp=action.value
            // }
            delete newState.searchResults;
            let query = action.value.toUpperCase();
            let reg = new RegExp(".*" + query + ".*");
            if (!state.symbolInfo) {
                newState.searchResults = axios
                    .get(constants.BASE_SERVER_URL + constants.SEARCH_SYMBOL, {
                        params: {
                            query: query,
                            limit: -1
                        }
                    })
                    .then(resp => {
                        return resp.data.data.map(key => {
                            let [symbol, exchange, name, type] = key.split('_');
                            return { symbol, exchange, name, type };
                        }).sort(sortFunction);
                    })
                    .then(null, err => {
                        console.log(err);
                        return [];
                    });
            } else {
                newState.searchResults = Promise.resolve(state.symbolInfo.filter(key => {
                    return reg.test(key);
                }).map(key => {
                    let [symbol, exchange, name, type] = key.split('_');
                    return { symbol, exchange, name, type };
                }).sort(sortFunction));
            }
            break;
        case constants.GET_ALL_SYMBOLS:
            // axios
            //     .get(constants.BASE_SERVER_URL + constants.SEARCH_SYMBOL, {
            //         params: {
            //             query: "*",
            //             limit: -1
            //         }
            //     })
            //     .then(syminfo => {
            //         newState.symbolInfo = syminfo.data.data;
            //     });
            break;
    }
    return newState;
}
export default reducer
