import React from 'react'
import FileMenu from './FileMenu'
import SceneDefaults from './SceneDefaults'
import SceneList from './SceneList'


function Editor() {

    return (
        <div>
            <FileMenu></FileMenu>
            <SceneDefaults></SceneDefaults>
            <SceneList></SceneList>
        </div>
    )
}

export default Editor