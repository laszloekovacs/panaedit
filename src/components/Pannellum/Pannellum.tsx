import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { resolvePathsToBlobUrl } from './resolvePathsToBlobUrl'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import _ from 'lodash'
import Preview from './Preview'
/*
 * due to working in memory, we can't use file paths, so the
 * scene object needs to be resolved to blob urls
 * use lodash to deep copy the defaults and scene into one object
 * warning: pannellum mutates its inputs
 * if there's only one scene, the flat structure is fine, no need to have scenes["key"].{scene}
 */
const PannellumContainer = () => {
	const folders = useContext(FoldersContext)
	const _state = useSelector((state: State) => state)

	if (!_state.editor.activeScene) return null

	const blob = resolvePathsToBlobUrl(
		(_state.scenes[_state.editor.activeScene] as Scene).panorama,
		folders
	)

	/* create the preview structure */
	let stateSlice = {
		type: 'equirectangular',
		panorama: blob,
		autoLoad: true
	}

	console.log('stateSlice ', stateSlice)

	return <Preview state={stateSlice} />
}

export default PannellumContainer
