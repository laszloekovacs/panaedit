import React from 'react'
//@ts-ignore
import styles from './picker.module.css'

type propType = {
    item: string,
    title: string,
    onClick: () => void,
    children: never[]
}


function PickerItem(props: propType) {
    return (
        <li key={props.item} onClick={() => props.onClick()}>
                <p>
                    {props.item}
                </p>
                <p>
                    {props.title}
                </p>
        </li>
    )
}

export default PickerItem