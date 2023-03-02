import React, { useEffect, useRef } from "react"
import type { Store } from "../../store/store"

declare global {
    interface Window {
        panorama: {
            destroy: () => null;
            loadScene: (arg0: string) => void;
            setYaw: (arg0: number) => void;
            getYaw: () => number;
        }
        pannellum: {
            viewer: (arg0: string, arg1: any) => any
        }
    }
}

function Pannellum({ store }: { store: Store }) {
    const viewref = useRef(null)

    useEffect(() => {
        /* scene is empty */
        if (Object.keys(store).length == 0) 
            return () =>{}
        
        console.log(store)
        window.panorama = window.pannellum.viewer("preview", store)

        /* set current scene */
        if (store.editor.currentScene != "") {
            window.panorama.loadScene(store.editor.currentScene)
            
            /* fix orientation with north offset */
            window.panorama.setYaw(store.scenes[store.editor.currentScene].northOffset)
        }

        return () => {
            window.panorama.destroy()
        }
    }, [store])

    return (
        <>
            <div id="preview" ref={viewref}></div>
        </>
    )
}

export default Pannellum
