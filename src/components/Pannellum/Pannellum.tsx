import React, { useEffect } from 'react'
import { convertToPannellumScene as resolvePathsToBlobUrl } from './convertToPannellumScene'

type PropType = {
	scene?: Scene
}

/*
	redux stores the paths to the images, but we need to use blobs urls
*/

const Pannellum = ({ scene }: PropType) => {
	useEffect(() => {
		//const preview = resolvePathsToBlobUrl(scene)
	}, [scene])

	return <div>PannellumView</div>
}

export default Pannellum
