//external  lib import
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

//internal lib import
import App from "./App";
import "./assets/css/bootstrap.css";
import "./assets/css/animate.min.css";
import "./assets/css/custom.css";
import store from "./redux/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
