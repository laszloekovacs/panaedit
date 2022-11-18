import React from "react";
import ReactDOM from "react-dom/client";
import reducer from "./reducer";
import { legacy_createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { Provider } from "react-redux";
import WorkspaceSelector from "./components/WorkspaceSelector";
import WorkfileSelector from "./components/WorkfileSelector";
import PreviewCache from "./components/PreviewCache";

let store = legacy_createStore(reducer, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <WorkspaceSelector>
      <WorkfileSelector>
        <PreviewCache>

        </PreviewCache>
      </WorkfileSelector>
    </WorkspaceSelector>
  </Provider>
);
