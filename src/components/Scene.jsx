import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { addHotspotAction } from '../reducer/actions';
import HotspotList from './HotspotList';

function Scene({ index, title }) {

    const dispatch = useDispatch();

    const formRef = useRef(0)

    const [yaw, setYaw] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [type, setType] = useState('');
    const [sceneId, setSceneId] = useState('');

    function getOrientationHandler(e) {
        e.preventDefault();
        setYaw(window.panorama.getYaw());
        setPitch(window.panorama.getPitch());
    }

    function yawHandler(e) {
        e.preventDefault();
        setYaw(e.target.value)
    }

    function pitchHandler(e) {
        e.preventDefault();
        setPitch(e.target.value)
    }

    function radioHandler(e) {
        setType(e.target.value)
    }

    function sceneHandler(e) {
        setSceneId(e.target.value)
    }

    function addHotspotHandler(e) {
        e.preventDefault();

        const form = {
            title,
            pitch: pitch.toFixed(2),
            yaw: yaw.toFixed(2),
            type,
            sceneId,
        }

        dispatch(addHotspotAction(form));
        clearForm()
    }

    function clearHandler(e) {
        e.preventDefault();
        clearForm();
    }

    function clearForm() {
        setSceneId('')
        setYaw(0)
        setPitch(0)

    }

    return (
        <li key={index}>
            <fieldset>
                <legend>{title}</legend>
                <details>
                    <summary>add new hotspot</summary>
                    <form>
                        <br />
                        <label htmlFor="sceneId">sceneId</label>
                        <input type="text" name="sceneId" value={sceneId} onChange={sceneHandler} required />
                        <br />

                        <button onClick={getOrientationHandler}>from view</button>
                        <br />
                        <label htmlFor="yaw">yaw</label>
                        <input type="text" name='yaw' value={yaw} onChange={yawHandler} required />
                        <br />
                        <label htmlFor="pitch">pitch</label>
                        <input type="text" name="pitch" value={pitch} onChange={pitchHandler} required />

                        <div onChange={radioHandler} defaultChecked="info" >
                            <label htmlFor="info">info</label>
                            <input type="radio" name="type" value="info" />

                            <label htmlFor="scene">scene</label>
                            <input type="radio" name="type" value="scene" />
                        </div>
                        <br />
                        <input type="submit" onClick={addHotspotHandler} />
                        <button onClick={clearHandler}>clear</button>
                    </form>
                </details>
                <HotspotList title={title}></HotspotList>
            </fieldset>
        </li>
    )
}

export default Scene