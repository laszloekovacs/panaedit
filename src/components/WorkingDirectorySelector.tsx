import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SceneType } from "../reducer/storeDefaults";

function WorkingDirectorySelector({ children }) {
  const workingDirectory = useSelector((state: SceneType) => state.editor?.workingDirectory);
  const dispatch = useDispatch();

  const handlePopup = async (e) => {
    try {
      const directoryHandle = await window.showDirectoryPicker({
        mode: "readwrite",
        startIn: "desktop",
      });
      console.log(directoryHandle);

      dispatch({ type: "SET_WORKINGDIRECTORY", payload: directoryHandle });
    } catch (err) {
      console.log(err);
    }
  };

  const selectorUI = (
    <div className="working-dir">
      <h2>Select local working directory</h2>
      <button onClick={handlePopup}>select</button>
    </div>
  );

  /** */
  return (
    <>
      {workingDirectory && children}
      {!workingDirectory && selectorUI}
    </>
  );
}

export default WorkingDirectorySelector;
