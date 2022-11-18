import React from 'react'

function WorkFileListItem({ item, onClick }) {
    
    return (
        <li onClick={()=> onClick(item)}>
            <p>{item}</p>
        </li>
    )
}

export default WorkFileListItem