import React, { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { workspaceContext } from "../workspace/Workspace"
import { Store } from "../../store/store"
import produce from "immer"
import { idText } from "typescript"
import Pannellum from "../pannellum/Pannellum"

function PreviewCache({ children }) {
    const store = useSelector((s: Store) => s)
    const [previewStore, setPreviewStore] = useState({})
    const workDirectory = useContext(workspaceContext)
    const [panoramaDirectory, setPanoramaDirectory] = useState<FileSystemDirectoryHandle | null>(null)
    const [assetsDirectory, setAssetsDirectory] = useState<FileSystemDirectoryHandle | null>(null)
    const [cache, setCache] = useState(new Map())

    /* open directories only once */
    /* check if we already loaded the image, otherwise cache it */
    async function resolvePanorama(dir: FileSystemDirectoryHandle, cache: Map<string, string>, panorama: string) {
        console.log("resolving")
        try {
            if (cache.has(panorama)) {
                return cache.get(panorama)
            } else {
                /* not in cache, needs to load */
                const file = await (await dir.getFileHandle(panorama)).getFile()
                const url = URL.createObjectURL(file)

                cache.set(panorama, url)
                return url
            }
        } catch (error) {
            return "error"
        }
    }

    async function resolveProject(workDirectory: FileSystemDirectoryHandle, blobCache: Map<string, string>, store: Store) {
        try {
            const updatedStore = produce(store, async (draft) => {
                /* go trough each scene, find panoramas */
                for (let scene of Object.values(draft.scenes)) {
                    if (panoramaDirectory != null)
                        scene.panorama = (await resolvePanorama(panoramaDirectory, blobCache, scene.panorama)) || ""
                }
            })

            setCache(blobCache)
            return updatedStore
        } catch (error) {
            console.log(error)
            return store
        }
    }

    /* make sure we have these ready */
    useEffect(() => {
        ;(async () => {
            let assets = assetsDirectory || (await workDirectory?.getDirectoryHandle("assets"))
            let panorama = panoramaDirectory || (await assets?.getDirectoryHandle("panorama"))

            if (assets && panorama) {
                setAssetsDirectory(assets)
                setPanoramaDirectory(panorama)
            } else {
                throw "failed to open assets and panorama directory"
            }
        })()
    }, [])

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

    return (
        <div>
            <Pannellum scene={previewStore} />
        </div>
    )
}

export default PreviewCache
