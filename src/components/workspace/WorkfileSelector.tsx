import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import WorkfileList from './WorkfileList'
import { workspaceContext } from './WorkspaceSelector'

const fileOptions = {
    types: [{ description: "json document", accept: { "application/json": [".json"] } }],
};


/* should handle loading scenes & pass it down to children */
function WorkfileSelector({ children }) {
    const store = useSelector(s => s)
    const dispatch = useDispatch()


    async function loadFileWithHandle(handle: FileSystemFileHandle) {
        try {
            const file = await handle.getFile();
            const fcontent = await file.text();
            console.log(fcontent)
            /* dispatch fcontent to redux store */
            dispatch({type: "LOAD_FILE", payload: JSON.parse(fcontent)})
        } catch (err) {
            console.log(err)
        }
    }

    /* user picked file */
    async function handleLoadFile(e) {
        try {
            const [handle] = await window.showOpenFilePicker(fileOptions)
            loadFileWithHandle(handle)
        } catch (err) {
            console.log(err)
        }
    }

    function handleReset() {
        /* dispatch defaults to store */
        dispatch({type: "RESET"})
    }

    if (store != null) {
        return <>{children}</>
    } else {

        return (
            <div>
                <h2>Select a project file from the working directory or create a new scene</h2>
                <button onClick={handleLoadFile}>load project...</button>
                <button onClick={handleReset}>new empty project</button>
                <p>projects in the current directory</p>
                <WorkfileList onClick={loadFileWithHandle}></WorkfileList>
            </div>
        )
    }
}

export default WorkfileSelector