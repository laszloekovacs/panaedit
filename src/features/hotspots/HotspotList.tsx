import React from "react";
import Hotspot from "./Hotspot";
// @ts-ignore
import styles from "./hotspot.module.css";

const dummy = ["first", "second", "third"];

function HotspotList() {
    const list = dummy.map((item) => {
        return <Hotspot key={item} title={item}></Hotspot>;
    });

    return (
        <div className={styles.container}>
            <ul>{list}</ul>
        </div>
    );
}

export default HotspotList;
