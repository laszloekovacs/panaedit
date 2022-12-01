import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Workspace from "../src/features/workspace/Workspace";
import Layout from "./Layout";
import Header from "./features/header/Header";

function App() {
    const props = { header: Header };
    return (
        <>
            <Provider store={store}>
                <Workspace>
                    <Layout header={<Header />}></Layout>
                </Workspace>
            </Provider>
        </>
    );
}

export default App;
