import React from "react"

function SceneListItem({ item, title, onClick }) {
    return (
        <li>
            <button onClick={onClick}>
                <p>{item}</p>
                <p>{title}</p>
            </button>
        </li>
    )
}

export default SceneListItem
