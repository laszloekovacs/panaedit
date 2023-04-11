import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resolvePathsToBlobUrl } from '../functions/resolvePathsToBlobUrl'

import _ from 'lodash'
import Preview from './Preview'
import { useEditor } from '../hooks/useEditor'

/*
 * due to working in memory / on remote server, we can't use file paths, so the
 * scene object needs to be resolved to blob urls
 * use lodash to deep copy the defaults and scene into one object
 * warning: pannellum mutates its inputs
 * if there's only one scene, the flat structure is fine, no need to have scenes["key"].{scene}
 */

const resolveScene = (scenes, cache) => {
	/* loop trough every scene */
	for (let key in scenes) {
		/* resolve the paths to blob urls */
		scenes[key].panorama = resolvePathsToBlobUrl(scenes[key].panorama, cache)
	}

	return scenes
}

const PreviewContainer = () => {
	const { cache, editor } = useEditor()
	const state = useSelector((state: State) => state)
	const [buffer, setBuffer] = useState<unknown | null>(null)

	if (!state.editor.activeSceneKey) return null

	useEffect(() => {
		// create a scenes copy with lodash, and resolve the paths to blob urls
		const scenesSlice = _.cloneDeep(state.scenes)
		const resolvedScenes = resolveScene(scenesSlice, cache)

		// create a state copy with lodash, and add the resolved scenes + default settings
		const defaultSlice = _.merge({}, state.default, { yaw: state.editor.yaw, pitch: state.editor.pitch })

		/* merge the preview */
		const stateSlice = _.merge({}, { default: defaultSlice }, { scenes: resolvedScenes })

		setBuffer(stateSlice)
	}, [editor.triggerRefresh])

	return <>{buffer && <Preview state={buffer} container={'preview'} />}</>
}

export default PreviewContainer
