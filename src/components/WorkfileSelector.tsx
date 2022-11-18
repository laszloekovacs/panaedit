import React, { createContext, useContext, useState } from "react";
import { workspaceContext } from "./WorkspaceSelector";

const workfileContext = createContext<FileSystemFileHandle | null>(null);

const pickerOpts = {
  types: [
    {
      description: "Project files",
      accept: {
        "application/json": [".json"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

function WorkfileSelector({ children }) {
  const [workFile, setWorkFile] = useState<FileSystemFileHandle | null>(null);
  const wd = useContext(workspaceContext);

  const handleClick = async (e) => {
    try {

      const [wf] = await window.showOpenFilePicker(pickerOpts)   
      console.log(wf)
      setWorkFile(wf)
    } catch (err) {
      console.log(err)
    }
    
  };

  const WorkfilePicker = () => {
    return (
      <>
        <p>select work file or create new</p>
        <button onClick={handleClick}>select project file</button>
      </>
    );
  };

  return (
    <workfileContext.Provider value={workFile}>
      {workFile && children}
      {!workFile && <WorkfilePicker></WorkfilePicker>}
    </workfileContext.Provider>
  );
}

export default WorkfileSelector;
