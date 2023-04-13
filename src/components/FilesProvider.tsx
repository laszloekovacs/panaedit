import React from 'react'

import { openWorkFiles } from '../functions/openWorkFiles'
import { useDispatch } from 'react-redux'
import { replaceCache } from '../store'
import _ from 'lodash'
import { useEditor } from '../hooks/useEditor'

/* 
	After opening the work folder, store all files including subfolders in a js Map
	with the original path in the key, and an object url as the value.
	later on, we just need to fiter out the files we need 
*/
const _directories = ['panoramas', 'articles', 'photos']

const FilesProvider = ({ children, directories = _directories }) => {
	const dispatch = useDispatch()
	const { cache } = useEditor()

	const onClick = async () => {
		const map = await openWorkFiles(directories)
		dispatch(replaceCache({ map }))
	}

	if (!cache || cache.length == 0) {
		return (
			<div className="m-auto flex h-full w-10/12 flex-col justify-center">
				<div>
					<button onClick={onClick}>
						Select local working directory
					</button>
					<p>
						or <a href="#">download</a> example project to try out
						this wonderfull product
					</p>

					<button>try online with a demo project</button>
				</div>
			</div>
		)
	} else {
		return <>{children}</>
	}
}

export default FilesProvider
