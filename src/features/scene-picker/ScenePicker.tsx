import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Store } from "../../store/store";

function ScenePicker({ onClose }) {
    const scenes = useSelector((store: Store) => store?.scenes);
    const dispatch = useDispatch();

    const list = (scenes && Object.keys(scenes)) || null;

    return (
        <div>
            <h1>pick scene</h1>
            <ul>
                {list?.map((item) => (
                    <li key={item}>
                        {item} - {scenes?.[item].title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScenePicker;
