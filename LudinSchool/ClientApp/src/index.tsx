import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore";
import { createBrowserHistory } from "history";
import "./styles/theme.scss";

import { ConfigProvider } from "antd";
import ukUA from "antd/lib/locale/uk_UA";

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider locale={ukUA}>
      <App />
    </ConfigProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
