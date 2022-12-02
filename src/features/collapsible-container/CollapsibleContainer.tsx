// @ts-ignore
import styles from "./collapsible.module.css";
import React, { useState } from "react";

interface propType {
    children: JSX.Element;
    title?: string;
}

function CollapsibleContainer({ children, title }) {
    const [isCollapsed, setCollapsed] = useState(false);

    return (
        <div className={styles.container}>
            <header>
                {title && <h3>{title}</h3>}
                <button onClick={() => setCollapsed(!isCollapsed)}>{isCollapsed ? "show" : "hide"}</button>
            </header>
            <main>{!isCollapsed && children}</main>
        </div>
    );
}

export default CollapsibleContainer;
