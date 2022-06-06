import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeHotspotAction } from '../reducer/actions'

function Hotspot({ index, parent }) {

    const hotspot = useSelector(s => s.scenes?.[parent]?.hotSpots[index])
    const dispatch = useDispatch()

    function removeHandler(e) {
        dispatch(removeHotspotAction(index, parent))
    }

    const id = hotspot.type == 'info' ? hotspot?.text : hotspot?.sceneId

    return (
        <li className='hotspotCard'>
            <p>Yaw: <b>{hotspot.yaw}</b> Pitch: <b>{hotspot.pitch}</b></p>
            <p>type: <b>{hotspot.type}</b> : <b>{id}</b></p>

            <button onClick={removeHandler}>remove</button>
        </li>
    )
}

export default Hotspot