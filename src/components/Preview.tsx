import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Store, Scene } from "../reducer/store";
import { workingDirectoryContext } from "./WorkingDirectoryProvider";

/* note to myself - we need to find all pictures and resources and preload them */
function Preview() {
  const store = useSelector((s: Store) => s);
  const workingDirectory = useContext(workingDirectoryContext);
  const [preview, setPreview] = useState<Store | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (workingDirectory != null) {
          const preview: Store = JSON.parse(JSON.stringify(store));

          for (let sc in preview.scenes) {
            const bp = "/" + preview.default.basePath + preview.scenes[sc].panorama;
            console.log(bp);

            const fh = await workingDirectory.getFileHandle(bp);
            const f = await fh.getFile();
            const url = URL.createObjectURL(f);
            //preview.scenes[sc].panorama = url;
            console.log(bp + "=>" + url);
          }

          setPreview(preview);
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
        window?.view?.destroy();
      } catch (err) {
        console.log(err);
      }
    };
  }, [preview]);

  return <div id="preview"></div>;
}

export default Preview;
