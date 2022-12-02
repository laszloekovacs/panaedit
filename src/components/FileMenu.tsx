import React, { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadFileAction, resetAction } from "../reducer/actions";
import { projectContext, Project } from "./ProjectProvider";

const fileOptions = {
  types: [{ description: "json document", accept: { "application/json": [".json"] } }],
};

function FileMenu() {
  const store = useSelector((s) => s);
  const dispatch = useDispatch();
  const project = useContext(projectContext);

  async function saveAsHandler(e) {
    e.preventDefault();

    try {
      const filehandle = await window.showSaveFilePicker(fileOptions);
      const writable = await filehandle.createWritable();

      await writable.write(JSON.stringify(store));
      await writable.close();
      console.log("file written");
    } catch (err) {
      console.error(err);
    }
  }

  async function loadHandler(e) {
    e.preventDefault();

    try {
      const [filehandle] = await window.showOpenFilePicker(fileOptions);
      const file = await filehandle.getFile();
      const data = await file.text();

      /* replace state in storage */
      dispatch(loadFileAction(JSON.parse(data)));
      console.log("file loaded");
      /* context need the project file */
      project?.setProjectFile(filehandle);
    } catch (err) {
      console.error(err);
    }
  }

  const resetScene = useCallback(() => {
    dispatch(resetAction());
  }, []);

  const resetPanorama = useCallback(() => {}, []);

  return (
    <div className="fileMenu">
      <button onClick={resetScene}>Reset scene</button>
      <button onClick={loadHandler}>Load..</button>
      <button onClick={saveAsHandler}>Save As..</button>
      <button onClick={resetPanorama}>Reset view</button>
    </div>
  );
}

export default FileMenu;
