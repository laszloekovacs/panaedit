import React from 'react'

type propType = {
    item: string,
    title: string,
    onClick: () => void,
    children: never[]
}


function PickerItem(props: propType) {
    return (
        <li key={props.item}>
            <button onClick={() => props.onClick()}>
                <p>
                    {props.item}
                </p>
                <p>
                    {props.title}
                </p>
            </button>
        </li>

    )
}

export default PickerItem