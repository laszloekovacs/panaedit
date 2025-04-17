import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveScene, setEditorOrientation } from '../store'
import _ from 'lodash'
import { useEditor } from '../hooks/useEditor'

/* Create a panorama view from the state */
const Preview = ({ state, container }) => {
	const dispatch = useDispatch()
	const { editor, cache } = useEditor()
	const viewerRef = useRef<PannellumViewer | null>(null)
	const prevScenesRef = useRef<any>(null)
	const prevActiveSceneRef = useRef<string | null>(null)
	const [isInitialized, setIsInitialized] = useState(false)
	const [lastTriggerCount, setLastTriggerCount] = useState(0)
	const [isRemoving, setIsRemoving] = useState(false)

	// Make cache accessible to hotspot tooltip functions
	useEffect(() => {
		// Create a function to access the cache from the window object
		window.getPhotoCacheFn = () => cache;
		
		// Cleanup
		return () => {
			delete window.getPhotoCacheFn;
		};
	}, [cache]);

	// Process any function strings to actual functions
	const processHotspot = (hotspot) => {
		const processedHotspot = { ...hotspot }
		
		// Process clickHandlerFuncStr if it exists
		if (processedHotspot.clickHandlerFuncStr) {
			try {
				// Direct evaluation is more reliable for function strings
				processedHotspot.clickHandlerFunc = eval('(' + processedHotspot.clickHandlerFuncStr + ')')
			} catch (error) {
				console.error(`Error creating function from clickHandlerFuncStr: ${error}`)
			}
		}
		
		// Process createTooltipFuncStr if it exists
		if (processedHotspot.createTooltipFuncStr) {
			try {
				// Direct evaluation is more reliable for function strings
				processedHotspot.createTooltipFunc = eval('(' + processedHotspot.createTooltipFuncStr + ')')
			} catch (error) {
				console.error(`Error creating function from createTooltipFuncStr: ${error}`)
			}
		}
		
		// For photo type hotspots, add special CSS class
		if (processedHotspot.type === 'photo') {
			processedHotspot.cssClass = processedHotspot.cssClass ? 
				`${processedHotspot.cssClass} pnlm-type-photo` : 'pnlm-type-photo'
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
			
			// Ensure compass is enabled in default configuration
			if (stateCopy.default) {
				stateCopy.default.compass = true;
				console.log('Compass enabled in default configuration');
			}
			
			// Process all hotspots in all scenes and ensure northOffset is applied
			for (const sceneKey in stateCopy.scenes) {
				const scene = stateCopy.scenes[sceneKey]
				// Explicitly log the northOffset to help debugging
				if (scene.northOffset !== undefined) {
					console.log(`Scene ${sceneKey} has northOffset: ${scene.northOffset}`);
				}
				
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
			setLastTriggerCount(editor.triggerRefresh)
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

	// Handle hotspot updates and northOffset changes
	useEffect(() => {
		if (!isInitialized || !viewerRef.current) return
		
		// If active scene changes, load it
		if (prevActiveSceneRef.current !== editor.activeSceneKey && editor.activeSceneKey) {
			console.log(`Loading scene: ${editor.activeSceneKey}`)
			viewerRef.current.loadScene(editor.activeSceneKey, editor.pitch, editor.yaw)
			prevActiveSceneRef.current = editor.activeSceneKey
			return
		}
		
		// Check for changes in the active scene
		const currentScene = state.scenes[editor.activeSceneKey]
		const prevScene = prevScenesRef.current?.[editor.activeSceneKey]
		
		if (currentScene && prevScene) {
			// Check if northOffset changed
			if (currentScene.northOffset !== prevScene.northOffset) {
				console.log(`North offset changed from ${prevScene.northOffset} to ${currentScene.northOffset}`)
				
				// Get current view position
				const currentYaw = viewerRef.current.getYaw()
				const currentPitch = viewerRef.current.getPitch()
				
				// Force reload of the scene to apply the new northOffset
				// Pannellum doesn't provide a direct API to update northOffset without reloading
				viewerRef.current.loadScene(editor.activeSceneKey, currentPitch, currentYaw)
				
				// Update the reference for next comparison
				prevScenesRef.current = _.cloneDeep(state.scenes)
				return
			}
			
			// Compare hotspot counts to detect changes
			if (currentScene.hotSpots.length !== prevScene.hotSpots.length) {
				console.log('Hotspot count changed, updating...')
				
				// Check if this is a removal (hotspot count decreased)
				if (currentScene.hotSpots.length < prevScene.hotSpots.length) {
					// This is a removal - handle by recreating all hotspots from scratch
					setIsRemoving(true)
					
					// Get current view
					const currentYaw = viewerRef.current.getYaw()
					const currentPitch = viewerRef.current.getPitch()
					
					// First clear all hotspots
					try {
						// For each previous hotspot index, try to remove it
						for (let i = 0; i < prevScene.hotSpots.length; i++) {
							try {
								viewerRef.current.removeHotSpot(i, editor.activeSceneKey)
							} catch (err) {
								// Ignore individual removal errors
							}
						}
					} catch (err) {
						console.error("Error removing hotspots:", err)
					}
					
					// Then add all current hotspots
					currentScene.hotSpots.forEach((hotspot, index) => {
						const processedHotspot = processHotspot(hotspot)
						try {
							viewerRef.current?.addHotSpot(processedHotspot, editor.activeSceneKey)
						} catch (error) {
							console.error(`Error re-adding hotspot at index ${index}:`, error)
						}
					})
					
					// Make sure view position is maintained
					viewerRef.current.setYaw(currentYaw)
					viewerRef.current.setPitch(currentPitch)
					
					setIsRemoving(false)
				} else {
					// This is an addition - just add the new hotspots
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
			} else {
				// Check for changes in existing hotspots
				currentScene.hotSpots.forEach((hotspot, index) => {
					const prevHotspot = prevScene.hotSpots[index]
					
					// Check if this hotspot was modified
					if (!_.isEqual(hotspot, prevHotspot)) {
						console.log('Hotspot updated:', hotspot.text)
						
						try {
							// Remove and re-add the hotspot to update it
							// Pannellum doesn't provide a direct way to update a hotspot
							viewerRef.current?.removeHotSpot(index, editor.activeSceneKey)
							const processedHotspot = processHotspot(hotspot)
							viewerRef.current?.addHotSpot(processedHotspot, editor.activeSceneKey)
						} catch (error) {
							console.error('Error updating hotspot:', error)
						}
					}
				})
			}
		}
		
		// Update refs for next comparison
		prevScenesRef.current = _.cloneDeep(state.scenes)
		prevActiveSceneRef.current = editor.activeSceneKey
	}, [state.scenes, editor.activeSceneKey, isInitialized, isRemoving])
	
	// Special effect just for triggerRefresh to handle full reloads
	useEffect(() => {
		if (!isInitialized || !viewerRef.current || editor.triggerRefresh === lastTriggerCount) return
		
		// Check if this is just after a removal (which already handled the update)
		if (isRemoving) return
		
		const currentScene = state.scenes[editor.activeSceneKey];
		const prevScene = prevScenesRef.current?.[editor.activeSceneKey];
		
		if (currentScene && prevScene && currentScene.northOffset !== prevScene.northOffset) {
			console.log(`North offset changed from ${prevScene.northOffset} to ${currentScene.northOffset}`);
			
			// Force reload of the scene to apply the new northOffset
			// We need to destroy and recreate the viewer completely
			const currentYaw = viewerRef.current.getYaw();
			const currentPitch = viewerRef.current.getPitch();
			
			// Reload scene entirely to apply northOffset
			viewerRef.current.loadScene(editor.activeSceneKey);
			
			// Restore view position
			setTimeout(() => {
			if (viewerRef.current) {
				viewerRef.current.setYaw(currentYaw);
				viewerRef.current.setPitch(currentPitch);
			}
			}, 100);
		}
		
		setLastTriggerCount(editor.triggerRefresh)
	}, [editor.triggerRefresh, isInitialized, isRemoving])
	
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