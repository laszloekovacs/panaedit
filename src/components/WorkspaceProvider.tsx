import React, { createContext, useEffect, useState } from "react";

const workspaceContext = createContext({ workingDirectory: null });

function ResourceCache({ children }) {
  const [workDirectory, setWorkDirectory] = useState<FileSystemDirectoryHandle | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setIsPending(true);

    window
      .showDirectoryPicker({ mode: "readwrite", startIn: "desktop" })
      .then((wd) => {
        setWorkDirectory(wd);
        setIsPending(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isPending && <p>pending...</p>}
      {!isPending && children}
    </>
  );
}

export default ResourceCache;
