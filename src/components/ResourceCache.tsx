import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { workingDirectoryContext } from "./WorkingDirectoryProvider";

function ResourceCache({ children }) {
  const [isPending, setIsPending] = useState(true);
  const state = useSelector((s) => s);
  const wd = useContext(workingDirectoryContext);

  useEffect(() => {
    setIsPending(true);
    (async () => {
      try {
        ///const fh = wd?.getFileHandle();
      } catch (err) {
        console.log(err);
      }
    })();
  }, [state]);

  return (
    <>
      {isPending && <p>pending...</p>}
      {!isPending && children}
    </>
  );
}

export default ResourceCache;
