import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveScene, setEditorOrientation } from '../store'
import _ from 'lodash'
import { useEditor } from '../hooks/useEditor'

/* Create a panorama view from the state */
const Preview = ({ state, container }) => {
	const dispatch = useDispatch()
	const { editor } = useEditor()
	const viewerRef = useRef<PannellumViewer | null>(null)
	const prevScenesRef = useRef<any>(null)
	const prevActiveSceneRef = useRef<string | null>(null)
	const [isInitialized, setIsInitialized] = useState(false)

	// Process any function strings to actual functions
	const processHotspot = (hotspot) => {
		const processedHotspot = { ...hotspot }
		
		// Process clickHandlerFuncStr if it exists
		if (processedHotspot.clickHandlerFuncStr) {
			try {
				processedHotspot.clickHandlerFunc = new Function(
					'e', 'args',
					`return (${processedHotspot.clickHandlerFuncStr})(e, args)`
				)
				console.log(`Processed clickHandler function for hotspot: ${processedHotspot.text}`)
			} catch (error) {
				console.error(`Error creating function from clickHandlerFuncStr: ${error}`)
			}
		}
		
		// Process createTooltipFuncStr if it exists
		if (processedHotspot.createTooltipFuncStr) {
			try {
				processedHotspot.createTooltipFunc = new Function(
					'hotSpotDiv', 'args',
					`return (${processedHotspot.createTooltipFuncStr})(hotSpotDiv, args)`
				)
			} catch (error) {
				console.error(`Error creating function from createTooltipFuncStr: ${error}`)
			}
		}
		
		return processedHotspot
	}

	// Initialize Pannellum viewer
	useEffect(() => {
		if (!window.pannellum) {
			throw new Error('Pannellum not loaded')
		}
		
		// Only create the viewer once
		if (!viewerRef.current && Object.keys(state.scenes).length > 0) {
			console.log('Initial Pannellum viewer creation')
			
			// Deep clone state to avoid mutations
			const stateCopy = _.cloneDeep(state)
			
			// Process all hotspots in all scenes
			for (const sceneKey in stateCopy.scenes) {
				const scene = stateCopy.scenes[sceneKey]
				if (scene.hotSpots && scene.hotSpots.length > 0) {
					scene.hotSpots = scene.hotSpots.map(processHotspot)
				}
			}
			
			// Create the viewer
			viewerRef.current = window.pannellum.viewer(container, stateCopy)
			
			// Set up event listeners
			viewerRef.current.on('animatefinished', () => {
				if (!viewerRef.current) return
				
				// Update orientation in Redux
				const yaw = parseFloat((viewerRef.current.getYaw() || 0).toFixed(2))
				const pitch = parseFloat((viewerRef.current.getPitch() || 0).toFixed(2))
				dispatch(setEditorOrientation({ yaw, pitch }))
			})
			
			viewerRef.current.on('scenechange', (sceneId) => {
				dispatch(setActiveScene({ sceneKey: sceneId as string }))
			})
			
			// Load active scene if available
			if (editor.activeSceneKey) {
				viewerRef.current.loadScene(editor.activeSceneKey, editor.pitch, editor.yaw)
			}
			
			// Store current scenes for comparison
			prevScenesRef.current = _.cloneDeep(state.scenes)
			prevActiveSceneRef.current = editor.activeSceneKey
			setIsInitialized(true)
		}
		
		// Cleanup on unmount
		return () => {
			if (viewerRef.current) {
				viewerRef.current.destroy()
				viewerRef.current = null
				setIsInitialized(false)
			}
		}
	}, []) // Empty dependency array means this only runs once

	// Handle hotspot updates without full reinitialization
	useEffect(() => {
		if (!isInitialized || !viewerRef.current) return
		
		// If active scene changes, load it
		if (prevActiveSceneRef.current !== editor.activeSceneKey && editor.activeSceneKey) {
			console.log(`Loading scene: ${editor.activeSceneKey}`)
			viewerRef.current.loadScene(editor.activeSceneKey, editor.pitch, editor.yaw)
			prevActiveSceneRef.current = editor.activeSceneKey
			return
		}
		
		// Check for hotspot changes in the active scene
		const currentScene = state.scenes[editor.activeSceneKey]
		const prevScene = prevScenesRef.current?.[editor.activeSceneKey]
		
		if (currentScene && prevScene) {
			// Compare hotspot counts to detect changes
			if (currentScene.hotSpots.length !== prevScene.hotSpots.length) {
				console.log('Hotspot count changed, updating...')
				
				// Find newly added hotspots (in current but not in prev)
				const newHotspots = currentScene.hotSpots.filter((hotspot, index) => {
					return index >= prevScene.hotSpots.length
				})
				
				// Add new hotspots to the viewer
				newHotspots.forEach(hotspot => {
					const processedHotspot = processHotspot(hotspot)
					try {
						console.log('Adding hotspot to existing viewer:', processedHotspot)
						viewerRef.current?.addHotSpot(processedHotspot, editor.activeSceneKey)
					} catch (error) {
						console.error('Error adding hotspot:', error)
					}
				})
			}
		}
		
		// Update refs for next comparison
		prevScenesRef.current = _.cloneDeep(state.scenes)
	}, [state.scenes, editor.activeSceneKey, editor.triggerRefresh, isInitialized])
	
	// Handle viewport orientation updates
	useEffect(() => {
		if (viewerRef.current && isInitialized) {
			// If orientation was changed from outside (e.g., reposition button)
			const viewerYaw = viewerRef.current.getYaw()
			const viewerPitch = viewerRef.current.getPitch()
			
			// Only set if values differ significantly to avoid loops
			if (Math.abs(viewerYaw - editor.yaw) > 0.5 || Math.abs(viewerPitch - editor.pitch) > 0.5) {
				viewerRef.current.setYaw(editor.yaw)
				viewerRef.current.setPitch(editor.pitch)
			}
		}
	}, [editor.yaw, editor.pitch, isInitialized])

	/* returned element */
	return (
		<div
			className="w-full border-2 border-neutral-700"
			id={container}
		></div>
	)
}

export default Preview