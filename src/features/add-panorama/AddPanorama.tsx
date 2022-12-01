import React from "react";
// @ts-ignore
import styles from "./addpanorama.module.css";

function AddPanorama() {
    return (
        <div className={styles.container}>
            <p>select panorama images to add</p>
            <button>add</button>
        </div>
    );
}

export default AddPanorama;
