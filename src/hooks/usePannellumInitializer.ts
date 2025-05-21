import { useEffect, useRef } from 'react'
import _ from 'lodash'

// This hook prepares scene data for Pannellum by converting function strings to actual functions
export function usePannellumInitializer(scenes: { [key: string]: Scene }, triggerRefresh?: number) {
  const processedScenesRef = useRef<{ [key: string]: Scene } | null>(null)
  
  useEffect(() => {
    if (!scenes || Object.keys(scenes).length === 0) return
    
    // Deep clone the scenes to avoid mutating the original
    const processedScenes = _.cloneDeep(scenes)
    
    // Process each scene
    for (const sceneKey in processedScenes) {
      const scene = processedScenes[sceneKey]
      
      // Process each hotspot
      if (scene.hotSpots && scene.hotSpots.length > 0) {
        scene.hotSpots = scene.hotSpots.map(hotspot => {
          const processedHotspot = { ...hotspot }
          
          // Convert clickHandlerFuncStr to actual function if it exists
          if (processedHotspot.clickHandlerFuncStr) {
            try {
              // Create a function from the string
              // Using Function constructor directly to avoid nested function issues
              processedHotspot.clickHandlerFunc = new Function(
                'e', 'args', 
                `return (${processedHotspot.clickHandlerFuncStr})(e, args)`
              ) as any
              
              // For debugging
              console.log('Processed clickHandler function for hotspot:', processedHotspot.text);
            } catch (error) {
              console.error(`Error creating function from clickHandlerFuncStr: ${error}`)
            }
          }
          
          // Convert createTooltipFuncStr to actual function if it exists
          if (processedHotspot.createTooltipFuncStr) {
            try {
              processedHotspot.createTooltipFunc = new Function(
                'hotSpotDiv', 'args',
                `return (${processedHotspot.createTooltipFuncStr})(hotSpotDiv, args)`
              ) as any
            } catch (error) {
              console.error(`Error creating function from createTooltipFuncStr: ${error}`)
            }
          }
          
          return processedHotspot
        })
      }
    }
    
    processedScenesRef.current = processedScenes
  }, [scenes, triggerRefresh]) // Add triggerRefresh as a dependency to ensure reprocessing
  
  return processedScenesRef.current
}