import React from 'react'
import AddHotspot from './AddHotspot';
import HotspotList from './HotspotList';

function Scene({ index, title }) {

    return (
        <li key={index}>
            <fieldset>
                <h3>{title}</h3>
                <AddHotspot title={title}></AddHotspot>
                <HotspotList title={title}></HotspotList>
            </fieldset>
        </li>
    )
}

export default Scene