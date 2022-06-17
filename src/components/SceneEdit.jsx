import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setInitialRotationAction, setTitleAction } from '../reducer/actions'

function SceneEdit() {

    const dispatch = useDispatch();
    const scenes = useSelector((s) => s.scenes);
    const editor = useSelector((s) => s.editor);

    const scene = scenes[editor?.currentScene];
    console.log(scene)


    function setDirectionHandler(e) {
        const yaw = window?.panorama?.getYaw();
        const pitch = window?.panorama?.getPitch();
        if (!yaw || !pitch) return;
        dispatch(setInitialRotationAction(editor.currentScene, yaw.toFixed(2), pitch.toFixed(2)))
    }

    function setTitleHandler(e) {
        if (e.key != "Enter") return;

        const titleInput = document.getElementById('title')

        if (titleInput.value == "") return;

        dispatch(setTitleAction(editor.currentScene, titleInput.value))

        titleInput.value = ''
    }

    return (
        <div>
            <hr />
            <h3>Edit Scene</h3>
            <hr />
            <h3>{editor?.currentScene} - {scene?.title}</h3>
            <div>
                <p>yaw: {scene?.yaw}</p>
                <button onClick={setDirectionHandler}>set initial view</button>
            </div>
            <div>
                <input id="title"
                    type="text"
                    placeholder="rename title -> press enter"
                    onKeyUp={setTitleHandler}
                />
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
