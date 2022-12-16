import React from "react"
import { useSelector } from "react-redux"
// @ts-ignore
import styles from "./sceneedit.module.css"
import type { Store } from "../../store/store"

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
                <h3>{scene.title}</h3>
                <div className={styles.row}>
                    <p>north offset: {scene.northOffset}</p>
                    <button>set from view</button>
                </div>
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
