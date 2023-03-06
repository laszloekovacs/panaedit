import React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Store } from "../../store/types"
import SceneListItem from "./SceneListItem"

// @ts-ignore
import styles from "./scenelist.module.css"

function SceneList() {
    const scenes = useSelector((store: Store) => store.scenes)
    const dispatch = useDispatch()

    const handleClick = (item) => {
        dispatch({ type: "SET_EDITOR_SCENE", payload: item })
    }

    const list = Object.keys(scenes).map((item) => {
        return <SceneListItem key={item} title={scenes[item].title} item={item} onClick={() => handleClick(item)} />
    })

    return <ul className={styles.container}>{list}</ul>
}

export default SceneList
