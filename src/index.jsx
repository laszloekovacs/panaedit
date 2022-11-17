import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reducer from "./reducer";
import { legacy_createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { Provider } from "react-redux";
import ProjectProvider from "./components/ProjectProvider";

let store = legacy_createStore(reducer, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ProjectProvider>
      <App></App>
    </ProjectProvider>
  </Provider>
);
