import React from 'react'

function SceneEdit() {
    return (
        <div>
            <hr />
            <h3>Edit Scene</h3>
            <hr />
            <h3>name of scene - title</h3>
            <div>
                <input type="text" placeholder='title' />
                <button>set</button>
            </div>
            <div>
                <input type="text" placeholder='yaw' />
                <button>set initial yaw</button>
            </div>
            <div>
                <input type="text" name="addnew" placeholder='new hotspot' />
                <button>add scene</button>
                <button>add info</button>
            </div>
            <h4>hotspots</h4>

        </div>
    )
}

export default SceneEdit