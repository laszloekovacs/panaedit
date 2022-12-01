import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
// @ts-ignore
import styles from "./header.module.css";

const pickerOpts = {
    types: [
        {
            description: "project files (json)",
            accept: {
                "application/json": [".json"],
            },
        },
    ],
    excludeAllOptions: true,
    multiple: false,
};

function Header() {
    const dispatch = useDispatch();

    const resetHandler = useCallback(() => {
        dispatch({ type: "RESET" });
    }, []);

    const loadHandler = useCallback(async () => {
        try {
            const [projectfile] = await window.showOpenFilePicker(pickerOpts);
            const data = await (await projectfile.getFile()).text();

            dispatch({ type: "LOAD_FILE", payload: JSON.parse(data) });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <button onClick={loadHandler}>Load</button>
                <button>Save as</button>
                <button onClick={resetHandler}>Reset</button>
            </div>
            <a href="https://github.com/laszloekovacs" target="_blank">
                Visit me on GitHub
            </a>
        </div>
    );
}

export default Header;
