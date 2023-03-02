import React, { KeyboardEventHandler, useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Store } from "../../store/store"

/// change to null and check
function SceneTitle({ currentscene }) {
    const scene = useSelector((s: Store) => s.scenes[currentscene])
    const [text, setText] = useState(scene.title)
    const dispatch = useDispatch()

    const handleInput = (event) => {
        dispatch({ type: "SET_SCENE_TITLE", payload: {scene: scene.title, title: text} })
    } 

    useEffect(()=> {
        setText(scene.title)
    }, [currentscene])

    return (
        <>
        <input value={text} type="text" onChange={e => setText(e.target.value)}/>
        <button onClick={handleInput}>set</button>
        </>
    )
}

export default SceneTitle
