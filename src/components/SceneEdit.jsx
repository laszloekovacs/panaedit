import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setInitialRotationAction } from '../reducer/actions'

function SceneEdit() {

    const dispatch = useDispatch();
    const scenes = useSelector((s) => s.scenes);
    const editor = useSelector((s) => s.editor);

    const scene = scenes[editor.currentScene];
    console.log(scene)


    function setDirectionHandler(e) {
        const yaw = window?.panorama?.getYaw();
        const pitch = window?.panorama?.getPitch();
        if (!yaw || !pitch) return;
        dispatch(setInitialRotationAction(editor.currentScene, yaw.toFixed(2), pitch.toFixed(2)))
    }

    return (
        <div>
            <hr />
            <h3>Edit Scene</h3>
            <hr />
            <h3>{editor?.currentScene} - {scene?.title}</h3>
            <div>
                <p>yaw: {scene?.yaw}</p>
                <button onClick={setDirectionHandler}>set initial yaw</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="title"
                />
                <button>set</button>
            </div>
            <div>
                <input
                    type="text"
                    name="addnew"
                    placeholder="new hotspot"
                />
                <button>add scene</button>
                <button>add info</button>
            </div>
            <h4>hotspots</h4>
        </div>
    );
}

export default SceneEdit;
