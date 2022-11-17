import React, { useState, useContext, createContext } from "react";

export const workingDirectoryContext = createContext<FileSystemDirectoryHandle | null>(null);

function WorkingDirectoryProvider({ children }) {
  const [workingDirectory, setWorkingDirectory] = useState<FileSystemDirectoryHandle | null>(null);

  const handlePopup = async (e) => {
    try {
      const directoryHandle = await window.showDirectoryPicker({
        mode: "readwrite",
        startIn: "desktop",
      });

      setWorkingDirectory(directoryHandle);
    } catch (err) {
      console.log(err);
    }
  };

  const selectorUI = (
    <div>
      <h2>Select local working directory</h2>
      <button onClick={handlePopup}>select</button>
    </div>
  );

  /** */
  return (
    <workingDirectoryContext.Provider value={workingDirectory}>
      {workingDirectory && children}
      {!workingDirectory && selectorUI}
    </workingDirectoryContext.Provider>
  );
}

export default WorkingDirectoryProvider;
