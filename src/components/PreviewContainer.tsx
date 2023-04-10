import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resolvePathsToBlobUrl } from '../functions/resolvePathsToBlobUrl'

import _ from 'lodash'
import Preview from './Preview'
import { setActiveScene } from '../store'
import { useEditor } from '../hooks/useEditor'

/*
 * due to working in memory / on remote server, we can't use file paths, so the
 * scene object needs to be resolved to blob urls
 * use lodash to deep copy the defaults and scene into one object
 * warning: pannellum mutates its inputs
 * if there's only one scene, the flat structure is fine, no need to have scenes["key"].{scene}
 */
const PreviewContainer = () => {
	const dispatch = useDispatch()
	const { cache, activeSceneKey, scene, editor } = useEditor()

	if (!activeSceneKey) return null

	const blob = resolvePathsToBlobUrl(scene.panorama, cache)

	/* redirect clicks on hotspots so pannellum does not try to navigate */
	const clickHandlerFunc = (event: MouseEvent, sceneKey: string) => {
		event.preventDefault()
		if (!sceneKey) return
		// set active scene to sceneKey
		dispatch(setActiveScene({ sceneKey }))
	}

	/* replace the click handler on hotspots */
	const hotSpots = scene.hotSpots.map((hotSpot) => {
		return {
			...hotSpot,
			clickHandlerFunc,
			clickHandlerArgs: hotSpot?.sceneId || ''
		}
	})

	/* create the preview structure */
	let stateSlice = {
		type: 'equirectangular',
		panorama: blob,
		autoLoad: true,
		hotSpotDebug: true,
		hotSpots,
		//restore rotation from editor
		yaw: editor.yaw,
		pitch: editor.pitch,
		compass: true
	}

	return (
		<div className="w-full max-h-full">
			<Preview state={stateSlice} container={'preview'} />
		</div>
	)
}

export default PreviewContainer
