import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Store } from "../reducer/store";
import { workspaceContext } from "./WorkspaceProvider";

const catcheContext = createContext<Store | null>(null);

export type CacheEntry = { filename: string; url: string };

/*
 * convert image paths to blob urls
 */
function PreviewCacheProvider({ children }) {
  /* the modified copy of the scene with blobs instead of file paths */
  const [preview, setPreview] = useState<Store | null>(null);
  /* the filepath -> blob lookup array*/
  const [blobCache, setBlobCache] = useState<CacheEntry[]>([]);
  /* our original state */
  const store = useSelector<Store, Store>((s) => s);
  const workdir = useContext(workspaceContext);

  useEffect(() => {
    (async () => {
      try {
        const assets = await workdir?.getDirectoryHandle("assets", { create: true });
        const panoramas = await assets?.getDirectoryHandle("panoramas", { create: true });

        /* react won't update until a rerender, thus we need a copy */
        const cache: CacheEntry[] = blobCache;

        /* loop trough all scenes */
        for (let sc in store.scenes) {
          const scene = store.scenes[sc];

          /* if we dont find the image file in the cache */
          if (undefined == cache.find((entry) => entry.filename == scene.panorama)) {
            // .. then load and add it into the cache
            const fh = await panoramas?.getFileHandle(scene.panorama);
            const file = await fh?.getFile();

            cache.push({ filename: scene.panorama, url: URL.createObjectURL(file!) });
          }

          /* either way, after we loaded the image, replace it in the preview store */
          scene.panorama = cache.find((entry) => entry.filename == scene.panorama)?.url || "err";
        } //end of looping trough scenes

        /* store our updated cache into react state */
        setBlobCache(cache);

        /* storeour newly generated scene  in state */
        setPreview(store);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [store]);

  /* */
  return (
    <>
      <catcheContext.Provider value={preview}>{children}</catcheContext.Provider>;
    </>
  );
}

export default PreviewCacheProvider;
