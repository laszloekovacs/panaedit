import React, { MouseEventHandler, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Store } from "../../store/store";

function ScenePicker({ onClose }) {
    const scenes = useSelector((store: Store) => store?.scenes);
    const dispatch = useDispatch();

    const list = (scenes && Object.keys(scenes)) || null;

    const clickHandler = (e) => {};

    return (
        <div>
            <h1>pick scene</h1>
            <ul>
                {list?.map((item) => (
                    <li key={item}>
                        <button
                            onClick={() => {
                                dispatch({ type: "SET_FIRST_SCENE", payload: item });
                                onClose();
                            }}
                        >
                            {item} - {scenes?.[item].title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScenePicker;
