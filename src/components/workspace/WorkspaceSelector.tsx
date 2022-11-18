import React, { createContext, useEffect, useState } from "react";

export const workspaceContext = createContext<FileSystemDirectoryHandle | null>(null);

/*
 *
 */
function WorkspaceSelector({ children }) {
  const [workDirectory, setWorkDirectory] = useState<FileSystemDirectoryHandle | null>(null);

  const handleClick = async (e) => {
    try {
      const wd = await window.showDirectoryPicker({ mode: "read", startIn: "desktop" });
      console.log(wd)
      setWorkDirectory(wd);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  const DirectoryPicker = () => {
    return (
      <>
        <button onClick={handleClick}>select working directory</button>
      </>
    );
  };

  return (
    <workspaceContext.Provider value={workDirectory}>
      {!workDirectory && <DirectoryPicker></DirectoryPicker>}
      {workDirectory && children}
    </workspaceContext.Provider>
  );
}

export default WorkspaceSelector;
