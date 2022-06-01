import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLoadSceneAction } from '../reducer'

function FileMenu() {
    const dispatch = useDispatch();
    const content = useSelector(s => s);

    async function openFileHandler(e) {
        try {

            const [filehandle] = await window.showOpenFilePicker();
            const file = await filehandle.getFile();
            const content = await file.text();
            const jsonContent = JSON.parse(content);

            dispatch(createLoadSceneAction(jsonContent))

        } catch (e) {
            console.log("no file loaded " + e)
        }
    }

    async function saveFileHandler(e) {
        try {
            const filehandle = await window.showSaveFilePicker();
            const writeStream = await filehandle.createWritable();

            const text = JSON.stringify(content)

            await writeStream.write(text);
            await writeStream.close();

        } catch (e) {
            console.log("failed to save: " + e)
        }
    }

    return (
        <div if="FileMenu">
            <button id="open" onClick={openFileHandler}>open</button>
            <button id="save" onClick={saveFileHandler}>save</button>
        </div>
    )
}

export default FileMenu