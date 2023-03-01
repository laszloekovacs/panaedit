import React, { useEffect, useRef, useState } from "react"
import type { Store } from "../../store/store"

declare global {
    interface Window {
        panorama: {
            destroy: () => null,
            loadScene: (arg0: string) => void
        }
        pannellum: {
            viewer: (arg0: string, arg1: any) => any
        }
    }
}

function Pannellum({ store }: { store: Store }) {
    const viewref = useRef(null)
    const [view, setView] = useState(null)

    useEffect(() => {
        console.log(store)
        window?.panorama?.destroy()
        window.panorama = window.pannellum.viewer("preview", store)

        /* set current scene */
        if (store.editor?.currentScene != "") {
            window.panorama.loadScene(store.editor?.currentScene)

            /* fix orientation with north offset */
            // window.panorama.setYaw(store.scenes[store.editor?.currentScene].northOffset)
        }

        return () => {
            window?.panorama?.destroy()
        }
    }, [store])

    return (
        <>
            <div id="preview" ref={viewref}></div>
        </>
    )
}

export default Pannellum
