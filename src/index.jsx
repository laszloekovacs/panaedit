import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reducer from "./reducer";
import { legacy_createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { Provider } from "react-redux";
import WorkspaceProvider from "./components/WorkspaceProvider";
import WorkfileProvider from "./components/WorkfileProvider";
import PreviewCache from "./components/PreviewCache";

let store = legacy_createStore(reducer, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <WorkspaceProvider>
      <WorkfileProvider>
        <PreviewCache>
          <App></App>
        </PreviewCache>
      </WorkfileProvider>
    </WorkspaceProvider>
  </Provider>
);
