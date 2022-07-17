import React from 'react'
import { useSelector } from 'react-redux'

function NSceneList() {
    const scenes = useSelector(s => s.scenes)
    let list = [];

    function loadScene(scene) {
        window?.panorama?.loadScene(scene);
    }

    for (scene in scenes) {
        list.push(scene)
    }

    const sceneList = list.map((scene, k) => (<li key={k}>
        <button onClick={() => loadScene(scene)}>{scene} - {scenes[scene].title}</button>
    </li>));

    if (list.length == 0) {
        return <h3>Scene List</h3>
    } else {
        return (
            <>
                <h3>Scene List</h3>
                <div className='scrollContainer'>
                    <ul>
                        {sceneList}
                    </ul>
                </div>
            </>
        )
    }
}

export default NSceneList