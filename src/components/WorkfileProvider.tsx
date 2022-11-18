import React, { createContext, useContext, useState } from "react";
import { workspaceContext } from "./WorkspaceProvider";

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

function WorkfileProvider({ children }) {
  const [workFile, setWorkFile] = useState<FileSystemFileHandle | null>(null);
  const wd = useContext(workspaceContext);

  const handleClick = (e) => {
    window
      .showOpenFilePicker(pickerOpts)
      .then((file) => {
        setWorkFile(file[0]);
      })
      .catch((err) => {
        console.log(err);
      });
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

export default WorkfileProvider;
