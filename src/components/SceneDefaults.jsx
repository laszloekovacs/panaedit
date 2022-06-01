import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createUpdateSceneAction } from '../reducer';

function SceneDefaults() {
    const dispatch = useDispatch();
    const defaults = useSelector(s => JSON.stringify(s.default))

    const [text, setText] = useState({})

    useEffect(() => {
        setText(defaults)
    }, [defaults])

    function changeHandler(e) {
        setText(e.target.value)
    }

    function updateHandler(e) {
        e.preventDefault();
        dispatch(createUpdateSceneAction({ default: JSON.parse(text) }))
    }

    return (
        <div id="SceneDefaults">
            <form>
                <label htmlFor="defaults">defaults</label>
                <textarea name="defaults" id="defaults" cols="30" rows="4" value={text} onChange={changeHandler}></textarea>
                <button onClick={updateHandler}>update</button>
            </form>
        </div>
    )
}

export default SceneDefaults