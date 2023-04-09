import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resolvePathsToBlobUrl } from './resolvePathsToBlobUrl'

import _ from 'lodash'
import Preview from './Preview'
import { setActiveScene } from '../../store'
import { useEditor } from '../../hooks'

/*
 * due to working in memory / on remote server, we can't use file paths, so the
 * scene object needs to be resolved to blob urls
 * use lodash to deep copy the defaults and scene into one object
 * warning: pannellum mutates its inputs
 * if there's only one scene, the flat structure is fine, no need to have scenes["key"].{scene}
 */
const PannellumContainer = () => {
	const dispatch = useDispatch()
	const { cache, activeSceneKey, scene, editor } = useEditor()

	if (!activeSceneKey) return null

	const blob = resolvePathsToBlobUrl(activeSceneKey, cache)

	/* redirect clicks on hotspots so pannellum does not try to navigate */
	const clickHandlerFunc = (event: MouseEvent, sceneKey: string) => {
		event.preventDefault()
		if (!sceneKey) return

		// set active scene to sceneKey
		dispatch(setActiveScene({ sceneKey }))
	}

	const hotSpots = scene.hotSpots.map((hotSpot) => {
		return {
			...hotSpot,
			clickHandlerFunc,
			clickHandlerArgs: hotSpot?.sceneId || ''
		}
	})

	console.log(hotSpots)

	/* create the preview structure */
	let stateSlice = {
		type: 'equirectangular',
		panorama: blob,
		autoLoad: true,
		hotSpotDebug: true,
		hotSpots,
		// restore rotation from editor
		yaw: editor.yaw,
		pitch: editor.pitch,
		compass: true
	}

	return <Preview state={stateSlice} container={'preview'} dispatch={dispatch} window={window} />
}

export default PannellumContainer
