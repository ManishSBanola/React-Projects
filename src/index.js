import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
// import App from "./components/App";
import { Provider } from "react-redux";
import combineReducer from "./Reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import reduxThunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
import(/*WebpackChunkName:'app' */ "./components/App").then(
  ({ default: App }) =>
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    )
);
