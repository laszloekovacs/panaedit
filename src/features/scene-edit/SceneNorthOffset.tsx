import React, { MouseEventHandler } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Store } from "../../store/store"

interface proptype {
    sceneId: string
}

function SceneNorthOffset({ sceneId }: proptype) {
    const scene = useSelector((s: Store) => s.scenes[sceneId])
    const dispatch = useDispatch()

    const clickHandler: MouseEventHandler = (event) => {
        if (window.panorama != undefined && window.panorama.getYaw != undefined) {
            const yaw = window.panorama.getYaw().toFixed(2)

            dispatch({ type: "SET_NORTH", payload: { yaw: yaw, scene: sceneId } })
        }
    }

    return (
        <div>
            <p>north offset: {scene.northOffset}</p>
            <button onClick={clickHandler}>set from view</button>
        </div>
    )
}

export default SceneNorthOffset
