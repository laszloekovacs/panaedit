import React from "react";
// @ts-ignore
import styles from "./sceneselect.module.css";
const dummyData = ["scene1", "scene2", "scene3", "otherScene", "the next scene"];

function FirstSceneSelect() {
    // use the redux store for controlled component

    const options = dummyData.map((item: string) => {
        return (
            <option value={item} key={item}>
                {item}
            </option>
        );
    });

    return (
        <div className={styles.container}>
            <p>Fisrst scene is set to R1</p>
            <select name="firstscene" id="firstscene">
                {options}
            </select>
            <button>set</button>
        </div>
    );
}

export default FirstSceneSelect;
