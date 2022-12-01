import React from "react";
// @ts-ignore
import styles from "./header.module.css";

function Header() {
    return (
        <div className={styles.container}>
            <div>
                <button>Load</button>
                <button>Save as</button>
                <button>Reset</button>
            </div>
            <a href="https://github.com/laszloekovacs" target="_blank">
                Visit me on GitHub
            </a>
        </div>
    );
}

export default Header;
