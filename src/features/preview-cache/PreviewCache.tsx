import React, { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { workspaceContext } from "../workspace/Workspace"
import { Store } from "../../store/store"
import produce from "immer"

function PreviewCache() {
    const store = useSelector((s: Store) => s)
    const [previewStore, setPreviewStore] = useState({})
    const workDirectory = useContext(workspaceContext)
    //   const
    const [cache, setCache] = useState(new Map())

    /* open directories only once */
    /* check if we already loaded the image, otherwise cache it */
    async function resolvePanorama(workDirectory: FileSystemDirectoryHandle, cache: Map<string, string>, panorama: string) {
        console.log("resolving")
        try {
            if (cache.has(panorama)) {
                return cache.get(panorama)
            }
            console.log(workDirectory)
            const assets = await workDirectory.getDirectoryHandle("assets")

            return ""
        } catch (error) {
            return ""
            console.log("failed?")
            console.log(error)
        }
    }

    async function resolveProject(workDirectory: FileSystemDirectoryHandle, blobCache: Map<string, string>, store: Store) {
        try {
            const updatedStore = produce(store, async (draft) => {
                /* go trough each scene, find panoramas */
                for (let scene of Object.values(draft.scenes)) {
                    scene.panorama = (await resolvePanorama(workDirectory, blobCache, scene.panorama)) || ""
                }
            })

            return updatedStore
        } catch (error) {
            console.log(error)
            return store
        }
    }

    /* make a copy of the fresh store, and change paths to blobs */
    useEffect(() => {
        console.log("updating preview cache")
        if (workDirectory == null) {
        } else {
            resolveProject(workDirectory, cache, store).then((preview) => {
                setPreviewStore(preview)
            })
        }
    }, [store])

    return <div>PreviewCache</div>
}

export default PreviewCache
