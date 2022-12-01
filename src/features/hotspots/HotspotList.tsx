import React from "react";
import Hotspot from "./Hotspot";
const dummy = ["first", "second", "third"];

function HotspotList() {
    const list = dummy.map((item) => {
        return <Hotspot key={item} title={item}></Hotspot>;
    });

    return <ul>{list}</ul>;
}

export default HotspotList;
