import React from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import styles from "./firstscene.module.css";
import type { Store } from "../../store/store";

function FirstSceneSelect() {
    const firstScene = useSelector((store: Store) => store?.default.firstScene);

    return (
        <div className={styles.container}>
            <p>First scene is {firstScene ? `is set to ${firstScene}` : "not set"}</p>
            <button>set</button>
        </div>
    );
}

export default FirstSceneSelect;
