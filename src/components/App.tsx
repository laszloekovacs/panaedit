import React from "react"
import { Provider } from "react-redux"
import WorkspaceSelector from './workspace/WorkspaceSelector'
import WorkfileSelector from "./workspace/WorkfileSelector"
import {store} from '../store/store'



function App() {
  return (
    <>
      <Provider store={store}>
        <WorkspaceSelector>
          <WorkfileSelector>
          </WorkfileSelector>
        </WorkspaceSelector>
      </Provider>
    </>
  );
}

export default App;
