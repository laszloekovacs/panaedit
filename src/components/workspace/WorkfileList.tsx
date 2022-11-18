import React, { useContext, useEffect, useState } from 'react'
import WorkFileListItem from './WorkFileListItem';
import { workspaceContext } from './WorkspaceSelector';

export type Entry = {
    key: string;
    value: FileSystemFileHandle | FileSystemDirectoryHandle;
}

/* find all workfiles in the work folder, render it in a list */
function WorkfileList({onClick}) {
    const workspace = useContext(workspaceContext);
    const [fileList, setFileList] = useState<Entry[]>([]);

    useEffect(() => {
        (async () => {
            try {
                if (workspace == null) {
                    console.log("no workfile found")
                    return;
                }

                let list: Entry[] = [];


                for await (const [key, value] of workspace.entries()) {
                    if (value instanceof FileSystemDirectoryHandle) {
                        continue
                    }
                    list = [...list, { key, value }]
                }

                setFileList(list)

            } catch (err) {
                console.log(err)
            }

        })()
    }, [workspace])


    async function handleClick(item: string) {
        const handle = await workspace?.getFileHandle(item)
        onClick(handle)
    }

    return (
        <ul>
            {fileList.map((e) => <WorkFileListItem key={e.key} item={e.key} onClick={handleClick}></WorkFileListItem>)}
        </ul>
    )
}

export default WorkfileList