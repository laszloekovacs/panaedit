import React from "react";
// @ts-ignore
import styles from "./sceneedit.module.css";
function SceneEdit() {
    return (
        <div>
            <h3>01CA - Vezérigazgató tárgyaló</h3>
            <div className={styles.row}>
                <p>north offset: 98.4</p>
                <button>set from view</button>
            </div>
            <br />
            <div>
                <button>add link to scene</button>
                <br />
                <button>add info bubble</button>
            </div>
        </div>
    );
}

export default SceneEdit;
