import React, { useReducer } from 'react'
import AddHotspotInfo from './AddHotspotInfo';

// none, info, scene
const initialState = {
    visible: "none"
}

function reducer(state, action) {
    return { visible: action.type };
}

function AddHotspot({ title }) {

    const [_state, _dispatch] = useReducer(reducer, initialState)

    function showInfoHandler(e) {
        _dispatch({ type: "info" })
    }

    function showSceneHandler(e) {
        _dispatch({ type: "scene" })
    }

    function collapseDialogHandler(e) {
        _dispatch({ type: "none" })
    }


    switch (_state.visible) {
        default:
        case 'none':
            return (
                <div>
                    <button onClick={showInfoHandler}>add info</button>
                    <button onClick={showSceneHandler}>add scene</button>
                </div>
            )

        case 'info':
            return (
                <div>
                    <AddHotspotInfo title={title} type={'info'} />
                    <button onClick={collapseDialogHandler}>close</button>
                </div>
            )

        case 'scene':
            return (
                <div>
                    <AddHotspotInfo title={title} type={'scene'} />
                    <button onClick={collapseDialogHandler}>close</button>
                </div>
            )
    }
}

export default AddHotspot