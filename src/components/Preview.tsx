import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Store, Scene } from "../reducer/store";
import produce from "immer";
import { workingDirectoryContext } from "./WorkingDirectoryProvider";

function generatePreviewScene(scene: Store, workingDirectory: FileSystemDirectoryHandle): Store | null {
  const preview = produce(scene, (draft: Store) => {
    /** */
    for (let sc in draft.scenes) {
      const fh = workingDirectory.getFileHandle(`${draft.default.basePath}${draft.scenes[sc].panorama}`);
      fh.then((file) => file.getFile()).then((file) => {
        draft.scenes[sc].panorama = URL.createObjectURL(file);
        console.log(draft.scenes[sc].panorama);
      });
    }
    /** */
  });

  return preview;
}

/**
 * ignore that typesctipt shows error that pannellum doesn't exists.
 */
function Preview() {
  const store = useSelector((s: Store) => s);
  const workingDirectory = useContext(workingDirectoryContext);

  useEffect(() => {
    const generated = generatePreviewScene(store, workingDirectory);

    window.pannellum.preview = window.pannellum.viewer("preview", store);

    return () => {
      window.pannellum.preview.destroy();
    };
  }, [store]);

  return <div id="preview"></div>;
}

export default Preview;
