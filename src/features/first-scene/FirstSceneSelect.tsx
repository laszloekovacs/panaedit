import React, { useState } from "react"
import { useSelector } from "react-redux"
// @ts-ignore
import styles from "./firstscene.module.css"
import type { Store } from "../../store/store"
import ScenePicker from "../scene-picker/ScenePicker"

function FirstSceneSelect() {
    const firstScene = useSelector((store: Store) => store.default.firstScene)
    const [showPicker, setShowPicker] = useState(false)

    const clickHandler = () => {
        setShowPicker(!showPicker)
    }

    return (
        <div className={styles.container}>
            <p>First scene is {firstScene ? `is set to ${firstScene}` : "not set"}</p>
            {!showPicker && <button onClick={clickHandler}>set</button>}
            {showPicker && <ScenePicker onClose={clickHandler} />}
        </div>
    )
}

export default FirstSceneSelect
