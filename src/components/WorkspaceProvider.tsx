import React, { createContext, useEffect, useState } from "react";

export const workspaceContext = createContext<FileSystemDirectoryHandle | null>(null);

/*
 *
 */
function WorkspacePorvider({ children }) {
  const [workDirectory, setWorkDirectory] = useState<FileSystemDirectoryHandle | null>(null);

  const handleClick = (e) => {
    window
      .showDirectoryPicker({ mode: "read", startIn: "desktop" })
      .then((wd) => {
        setWorkDirectory(wd);
      })
      .catch((err) => console.log(err));
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

export default WorkspacePorvider;
