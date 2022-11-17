import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Store, Scene } from "../reducer/store";
import { projectContext, Project } from "./ProjectProvider";

/* note to myself - we need to find all pictures and resources and preload them */
function Preview() {
  const store = useSelector<Store, Store>((s) => s);
  const project: Project | null = useContext(projectContext);

  const [previewScene, setPreviewScene] = useState<Store | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    setIsPending(true);
    (async () => {
      try {
        if (project != null && project.projectFile != null) {
          const preview: Store = JSON.parse(JSON.stringify(store));

          for (let sc in preview.scenes) {
            const fh = await project.panoramaDirectory.getFileHandle(preview.scenes[sc].panorama);
            const f = await fh.getFile();
            const url = URL.createObjectURL(f);
            preview.scenes[sc].panorama = url;
            console.log(url);
          }

          setPreviewScene(preview);
          setIsPending(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [store]);

  /**
   * ignore that typesctipt shows error that pannellum doesn't exists.
   */
  useEffect(() => {
    try {
      //window.view = window?.pannellum?.viewer("preview", preview);
    } catch (err) {
      console.log(err);
    }

    return () => {
      try {
        //window?.view?.destroy();
      } catch (err) {
        console.log(err);
      }
    };
  }, [previewScene]);

  return (
    <div>
      <>{!isPending && <div id="preview"></div>}</>
    </div>
  );
}

export default Preview;
