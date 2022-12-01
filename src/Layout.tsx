// @ts-ignore
import styles from "./layout.module.css";
import React from "react";

interface propType {
    header?: null | JSX.Element;
    sidebar?: null | JSX.Element;
    preview?: null | JSX.Element;
    statusbar?: null | JSX.Element;
}

function Layout({ header, sidebar, preview, statusbar }: propType) {
    return (
        <div className={styles.container}>
            <header>{header && header}</header>
            <aside>{sidebar && sidebar}</aside>
            <main>{preview && preview}</main>
            <article>{statusbar && statusbar}</article>
        </div>
    );
}

export default Layout;
