import React, { useState } from "react"
import { useSelector } from "react-redux"
// @ts-ignore
import styles from "./firstscene.module.css"
import type { Store } from "../../store/store"
import ScenePicker from "../scene-picker/ScenePicker"

function FirstSceneSelect() {
    const firstScene = useSelector((store: Store) => store?.default?.firstScene)
    const [showPicker, setShowPicker] = useState(false)

    const clickHandler = () => {
        setShowPicker(true)
    }

    const closeHandler = () => {
        setShowPicker(false)
    }

    return (
        <div className={styles.container}>
            <p>First scene is {firstScene ? `is set to ${firstScene}` : "not set"}</p>
            {!showPicker && <button onClick={clickHandler}>set</button>}
            {showPicker && <ScenePicker onClose={closeHandler} />}
        </div>
    )
}

export default FirstSceneSelect
