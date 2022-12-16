import React from "react"
import { useDispatch } from "react-redux"
// @ts-ignore
import styles from "./addpanorama.module.css"

const pickerOpts = {
    types: [
        {
            description: "Images",
            accept: {
                "image/*": [".png", ".gif", ".jpeg", ".jpg"],
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: true,
}

function AddPanorama() {
    const dispatch = useDispatch()

    const handleClick = async (e) => {
        const files = await window.showOpenFilePicker(pickerOpts)

        if (files.length == 0) return

        for (const file of files) {
            dispatch({ type: "ADD_PANORAMA", payload: file.name })
        }
    }

    return (
        <div className={styles.container}>
            <p>select panorama images to add</p>
            <button onClick={handleClick}>add</button>
        </div>
    )
}

export default AddPanorama
