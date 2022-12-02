import React from "react"
import { useSelector } from "react-redux"
import type { Store } from "../../store/store"
import SceneListItem from "./SceneListItem"

// @ts-ignore
import styles from "./scenelist.module.css"

const dummyScenes = ["ab - vezérigazgató", "ba - előszoba", "fg - folyosó", "er- öltöző", "dfs - konyha", "er - iroda"]

function SceneList() {
    const scenes = useSelector((store: Store) => store?.scenes) || {}

    const list = Object.keys(scenes).map((item) => {
        return <SceneListItem key={item} title={scenes[item].title} item={item} onClick={() => {}} />
    })

    return <ul className={styles.container}>{list}</ul>
}

export default SceneList
