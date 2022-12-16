import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { Store } from "../../store/store"

function SceneTitle({ currentscene }) {
    const scene = useSelector((s: Store) => s.scenes[currentscene])
    const [text, setText] = useState("")

    useEffect(() => {
        setText(scene.title)
    }, [scene])

    return (
        <>
            <input
                type="text"
                name="title"
                placeholder={currentscene}
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                }}
            />
        </>
    )
}

export default SceneTitle
