import React from 'react'

import { openWorkFiles } from '../functions/openWorkFiles'
import { useDispatch } from 'react-redux'
import { replaceCache } from '../store'
import _ from 'lodash'
import { useEditor } from '../hooks/useEditor'
import { loadOnlineAssets } from '../functions/loadOnlineAssets'

/* 
	After opening the work folder, store all files including subfolders in a js Map
	with the original path in the key, and an object url as the value.
	later on, we just need to fiter out the files we need 
*/
const _directories = ['panoramas', 'articles', 'photos']

const FilesProvider = ({ children, directories = _directories }) => {
	const dispatch = useDispatch()
	const { cache } = useEditor()

	const handleSelectDirectory = async () => {
		const map = await openWorkFiles(directories)
		dispatch(replaceCache({ map }))
	}

	// populate the cache from hosted public directory
	const handleLoadDemoAssets = async () => {
		const map = await loadOnlineAssets()
		dispatch(replaceCache({ map }))
	}

	if (!cache || cache.length == 0) {
		return (
			<div className="flex h-full flex-col justify-center">
				<iframe
					className="absolute left-0 top-0 z-0 overflow-hidden"
					tabIndex={-1}
					width="100%"
					height="100%"
					allowFullScreen={true}
					src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=https://pannellum.org/images/alma.jpg&autoRotate=-4&autoLoad=true"></iframe>
				<div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-40"></div>
				<div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center">
					<div className="grid grid-cols-2 p-8 backdrop-blur-xl rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.2)"}}>
						<h1 className="text-bold col-span-2 mb-12 text-xl text-neutral-100 ">
							Pannellum Tour Editor
						</h1>
						<div>
							<button onClick={handleLoadDemoAssets} className="rounded-sm">
								Read Tutorial
							</button>
						</div>

						<div>
							<button onClick={handleSelectDirectory} className="rounded-sm">
								Select Working Directory
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return <>{children}</>
	}
}

export default FilesProvider
