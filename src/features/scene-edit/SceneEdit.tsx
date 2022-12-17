import React from "react"
import { useSelector } from "react-redux"
// @ts-ignore
import styles from "./sceneedit.module.css"
import type { Store } from "../../store/store"
import SceneTitle from "./SceneTitle"
import SceneNorthOffset from "./SceneNorthOffset"

function SceneEdit() {
    const store = useSelector((s: Store) => s)
    const currentscene = store.editor.currentScene

    if (currentscene == "") {
        return (
            <div>
                <p>select a scene to edit</p>
            </div>
        )
    } else {
        const scene = store.scenes[currentscene]

        return (
            <div>
                <h3>{currentscene}</h3>
                <SceneTitle currentscene={currentscene}></SceneTitle>
                <SceneNorthOffset sceneId={currentscene}></SceneNorthOffset>
                <br />
                <div>
                    <button>add link to scene</button>
                    <br />
                    <button>add info bubble</button>
                </div>
            </div>
        )
    }
}

export default SceneEdit
