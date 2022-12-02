import React, { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { workspaceContext } from "../workspace/Workspace"
import { Store } from "../../store/store"
import produce from "immer"

function PreviewCache() {
    const store = useSelector((s: Store) => s)
    const [previewStore, setPreviewStore] = useState({})
    const workDirectory = useContext(workspaceContext)
    const [cache, setCache] = useState(new Map())

    const resolveProject: (blobCache: Map<string, string>, store: Store) => Promise<{}> = async (blobCache, scenes) => {
        try {
            if (store.scenes != null && typeof store.scenes == "object" && Object.keys.length != 0) {
                const resolvedStore = produce(store, (draft) => {
                    for (let item of Object.values(store.scenes)) {
                    }
                })
            }

            return {}
        } catch (error) {
            console.log(error)
            return {}
        }
    }

    /* make a copy of the fresh store, and change paths to blobs */
    useEffect(() => {}, [store])

    return <div>PreviewCache</div>
}

export default PreviewCache
