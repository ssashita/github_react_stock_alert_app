import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux"
import { CookiesProvider } from "react-cookie"
import ProviderContext from "./components/ProviderContext";
import channel from "./broadcastchannel";

const AppContext = ProviderContext.context;
const store = ProviderContext.store;

channel.postMessage({ msg: "Message fro Browser app client" });
ReactDOM.render(
    <CookiesProvider>
        <Provider store={store} context={AppContext}>
            <App />
        </Provider>
    </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
