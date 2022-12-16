import React, { useEffect, useRef, useState } from "react"

function Pannellum({ scene }) {
    const viewref = useRef(null)
    const [view, setView] = useState(null)

    useEffect(() => {
        console.log(scene)
        window?.panorama?.destroy()
        window.panorama = window.pannellum.viewer("preview", scene)

        return () => {
            window?.panorama?.destroy()
        }
    }, [scene])

    return (
        <>
            <div id="preview" ref={viewref}></div>
        </>
    )
}

export default Pannellum
