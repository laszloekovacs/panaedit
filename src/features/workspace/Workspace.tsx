// @ts-ignore
import styles from "./workspace.module.css";
import React, { createContext, useState } from "react";

export const workspaceContext = createContext<FileSystemDirectoryHandle | null>(null);

function Workspace({ children }: { children?: any }) {
    const [workDirectory, setWorkDirectory] = useState<FileSystemDirectoryHandle | null>(null);

    const handleClick = async (e: any) => {
        try {
            const wd = await window.showDirectoryPicker({
                mode: "read",
                startIn: "desktop",
            });
            setWorkDirectory(wd);
        } catch (err) {
            if (err) {
                console.log(err);
            }
        }
    };

    const DirectoryPicker = () => {
        return (
            <div className={styles.container}>
                <button onClick={handleClick}>Select working directory</button>
                
                <a href="DemoProject.zip">download example project file</a>
            </div>
        );
    };

    return (
        <workspaceContext.Provider value={workDirectory}>
            {!workDirectory && <DirectoryPicker></DirectoryPicker>}
            {workDirectory && children}
        </workspaceContext.Provider>
    );
}

export default Workspace;
