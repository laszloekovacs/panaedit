import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reducer from "./reducer";
import { legacy_createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { Provider } from "react-redux";
import WorkspaceProvider from "./components/WorkspaceProvider";
import WorkfileProvider from "./components/WorkfileProvider";

let store = legacy_createStore(reducer, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <WorkspaceProvider>
      <WorkfileProvider>
        <App></App>
      </WorkfileProvider>
    </WorkspaceProvider>
  </Provider>
);
