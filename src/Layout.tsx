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
        <main className={styles.container}>
            <header>{header && header}</header>
            <aside>{sidebar && sidebar}</aside>
            <div>{preview && preview}</div>
            <article>{statusbar && statusbar}</article>
        </main>
    );
}

export default Layout;
