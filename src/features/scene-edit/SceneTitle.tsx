import React, { KeyboardEventHandler, useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Store } from "../../store/store"

/// change to null and check
function SceneTitle({ currentscene }) {
    const scene = useSelector((s: Store) => s.scenes[currentscene])
    const [content, setContent] = useState("")
    const inputRef = useRef<HTMLParagraphElement>(null)
    const dispatch = useDispatch()

    const handleInput: KeyboardEventHandler = (event) => {
        if (event.key == "Enter") {
            inputRef.current?.blur()

            dispatch({ type: "SET_SCENE_TITLE", payload: { scene: currentscene, title: inputRef.current?.innerText } })
        }
    }

    useEffect(() => {
        setContent(scene.title)
    }, [currentscene])

    return (
        <>
            <p ref={inputRef} contentEditable onKeyDown={handleInput}>
                {content}
            </p>
        </>
    )
}

export default SceneTitle
