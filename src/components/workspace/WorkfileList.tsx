import React, { useContext, useEffect, useState } from 'react'
import WorkFileListItem from './WorkFileListItem';
import { workspaceContext } from './WorkspaceSelector';


function WorkfileList() {
    /* find all workfiles in the folder, render it in a list */
    const workspace = useContext(workspaceContext);
    const [fileList, setFileList] = useState<{ key: string; value: any }[]>([]);

    useEffect(() => {
        (async () => {
            try {
                let list: { key: string; value: any }[] = [];
                
                for await (const [key, value] of workspace!.entries()) {
                    console.log({ key, value })
                    list.push({ key, value })
                }

                setFileList(list)
            } catch (err) {
                console.log(err)
            }

        })()
    }, [workspace])


    return (
        <ul>
            {fileList.map((e) => <WorkFileListItem key={e.key} item={e.key}></WorkFileListItem>)}
        </ul>
    )
}

export default WorkfileList