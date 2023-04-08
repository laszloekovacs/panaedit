import React, { useEffect } from 'react'
import { resolvePathsToBlobUrl } from './resolvePathsToBlobUrl'

/*
	redux stores the paths to the images, but we need to use blobs urls
*/

const Pannellum = () => {
	useEffect(() => {
		//const preview = resolvePathsToBlobUrl(scene)
	}, [])

	return <div>PannellumView</div>
}

export default Pannellum
