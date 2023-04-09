import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { resolvePathsToBlobUrl } from './resolvePathsToBlobUrl'
import { FilesContext } from '../FilesProvider/FilesProvider'
import _ from 'lodash'
import Preview from './Preview'
/*
 * due to working in memory / on remote server, we can't use file paths, so the
 * scene object needs to be resolved to blob urls
 * use lodash to deep copy the defaults and scene into one object
 * warning: pannellum mutates its inputs
 * if there's only one scene, the flat structure is fine, no need to have scenes["key"].{scene}
 */
const PannellumContainer = () => {
	const folders = useContext(FilesContext)
	const state = useSelector((state: State) => state)

	if (!state.editor.activeScene) return null

	const activeScene = state.scenes[state.editor.activeScene] as Scene

	const blob = resolvePathsToBlobUrl(activeScene.panorama, folders)

	/* create the preview structure */
	let stateSlice = {
		type: 'equirectangular',
		panorama: blob,
		autoLoad: true,
		hotSpotDebug: true,
		hotSpots: _.clone(activeScene.hotSpots)
	}

	console.log('stateSlice ', stateSlice)

	return <Preview state={stateSlice} container={'preview'} />
}

export default PannellumContainer
