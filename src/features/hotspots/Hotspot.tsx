import React from "react";
// @ts-ignore
import styles from "./hotspot.module.css";

/* TODO: add some mini grid layout */
function Hotspot({ title }) {
    return (
        <li className={styles.card}>
            <div className={styles.grid}>
                <p>title:</p>
                <p>{title}</p>
                <p>target:</p>
                <p>01CA - vezérgiazgató iroda</p>
                <p>yaw: 45.5</p>
                <p>pitch: 45.5</p>
            </div>
            <div className={styles.right}>
                <button>remove</button>
            </div>
        </li>
    );
}

export default Hotspot;
