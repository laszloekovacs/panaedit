// @ts-ignore
import styles from "./collapseable.module.css";
import React, { useState } from "react";

function CollapsableContainer({ children }) {
    const [isCollapsed, setCollapsed] = useState(false);

    return (
        <div className="container">
            <div>{isCollapsed ? <button>show</button> : <button>hide</button>}</div>
            <div>{!isCollapsed && children}</div>
        </div>
    );
}

export default CollapsableContainer;
