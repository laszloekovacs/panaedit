import React from 'react'

function SceneList() {
    return (
        <div>
            <h3>SceneList</h3>
            <form action="">
                <fieldset>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required />

                    <label htmlFor="niceName">NiceName</label>
                    <input type="text" name="niceName" id="title" />

                    <label htmlFor="panorama">Panorama</label>
                    <input type="text" name="panorama" id="panorama" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="yaw">yaw</label>
                    <input type="text" name="yaw" />
                    <label htmlFor="pitch">pitch</label>
                    <input type="text" name="pitch" />
                    <button>set from view</button>
                </fieldset>
                <button>add scene</button>
            </form>

            <ul>

            </ul>
        </div>
    )
}

export default SceneList