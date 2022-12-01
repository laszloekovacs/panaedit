import React from "react";

/* TODO: add some mini grid layout */
function Hotspot({ title }) {
    return (
        <li>
            <p>{title}</p>
            <p>yaw: 45.5</p>
            <p>pitch: 45.5</p>
            <p id="title">scene</p>
            <p>target: 01CA - vezérgiazgató iroda</p>
            <button>remove</button>
        </li>
    );
}

export default Hotspot;
