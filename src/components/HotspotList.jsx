import React from 'react'
import { useSelector } from 'react-redux'
import Hotspot from './Hotspot'

function HotspotList({ title }) {

    const hotspots = useSelector(s => s.scenes[title]?.hotSpots);

    if (hotspots) {
        const hotspotList = hotspots.map((v, k) => {
            return (<Hotspot key={k} index={k} parent={title}></Hotspot>)
        })

        return (
            <>
                <ul>
                    {hotspotList}
                </ul>
            </>
        )
    } else {


        return (
            <>
                <p>no hotspots</p>
            </>
        )
    }
}

export default HotspotList