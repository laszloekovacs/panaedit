import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEditor } from '../hooks/useEditor'
import { setActiveScene, triggerRefresh, setActiveView } from '../store'

// This component creates a small map view that can be embedded in other components
// like the EditorLayout to provide quick navigation between scenes

const MiniMap = () => {
  const dispatch = useDispatch()
  const { scenes, activeSceneKey, cache } = useEditor()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Get floor plan data from Redux store
  const floorPlan = useSelector((state: State) => state.floorPlan || { imagePath: '', markers: [] })
  const floorPlanPath = floorPlan?.imagePath || null
  const markers = floorPlan?.markers || []
  
  // If there's no floor plan set but we have photos, create a fallback grid view
  useEffect(() => {
    if (!floorPlanPath && markers.length === 0) {
      // This is just visual fallback when no floor plan is configured yet
      // In a complete implementation, we would guide the user to the Map tab
      console.log("No floor plan configured. Using fallback grid layout.")
    }
  }, [floorPlanPath, markers])
  
  // Draw markers on canvas
  useEffect(() => {
    if (!canvasRef.current || !markers.length) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions to match the container
    const container = canvas.parentElement
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // First, draw connections between markers based on hotspots
    if (markers.length > 1) {
      // Create a map for quick marker lookup by sceneKey
      const markerBySceneKey = {}
      markers.forEach(marker => {
        if (marker.sceneKey) {
          markerBySceneKey[marker.sceneKey] = marker
        }
      })
      
      // Draw lines between connected scenes
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.4)'
      ctx.lineWidth = 1
      ctx.setLineDash([3, 2])
      
      Object.entries(scenes).forEach(([sceneKey, scene]) => {
        // Get the marker for this scene
        const sourceMarker = markerBySceneKey[sceneKey]
        if (!sourceMarker) return
        
        const sourceX = sourceMarker.x * canvas.width
        const sourceY = sourceMarker.y * canvas.height
        
        // Find all scene hotspots
        scene.hotSpots.forEach(hotspot => {
          if (hotspot.type === 'scene' && hotspot.sceneId) {
            // Get the target marker
            const targetMarker = markerBySceneKey[hotspot.sceneId]
            if (targetMarker) {
              const targetX = targetMarker.x * canvas.width
              const targetY = targetMarker.y * canvas.height
              
              // Draw line
              ctx.beginPath()
              ctx.moveTo(sourceX, sourceY)
              ctx.lineTo(targetX, targetY)
              ctx.stroke()
            }
          }
        })
      })
      
      // Reset dash for other drawing
      ctx.setLineDash([])
    }
    
    // Then draw all markers on top
    markers.forEach(marker => {
      const x = marker.x * canvas.width
      const y = marker.y * canvas.height
      
      // Draw marker circle
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      
      // Highlight active scene marker
      if (marker.sceneKey === activeSceneKey) {
        ctx.fillStyle = 'rgba(255, 165, 0, 0.8)' // Orange
      } else {
        ctx.fillStyle = 'rgba(0, 120, 255, 0.6)' // Blue
      }
      
      ctx.fill()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'white'
      ctx.stroke()
      
      // Draw direction indicator if this marker has a scene with northOffset
      if (marker.sceneKey && scenes[marker.sceneKey]) {
        const scene = scenes[marker.sceneKey]
        if (scene.northOffset !== undefined) {
          // Convert north offset to radians (northOffset is in degrees)
          const angleRad = (scene.northOffset * Math.PI) / 180
          
          // Calculate direction line endpoint
          const lineLength = marker.sceneKey === activeSceneKey ? 12 : 8
          const dirX = x + Math.sin(angleRad) * lineLength
          const dirY = y - Math.cos(angleRad) * lineLength
          
          // Draw direction line
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(dirX, dirY)
          ctx.strokeStyle = marker.sceneKey === activeSceneKey ? 'rgba(255, 165, 0, 0.9)' : 'white'
          ctx.lineWidth = 1.5
          ctx.stroke()
          
          // Draw arrowhead for active scene or when expanded
          if (marker.sceneKey === activeSceneKey || isExpanded) {
            const arrowSize = 4
            const arrowAngle = Math.PI / 6 // 30 degrees
            
            // Calculate arrow points
            const arrowAngle1 = angleRad + Math.PI - arrowAngle
            const arrowAngle2 = angleRad + Math.PI + arrowAngle
            
            const arrowX1 = dirX + Math.sin(arrowAngle1) * arrowSize
            const arrowY1 = dirY - Math.cos(arrowAngle1) * arrowSize
            const arrowX2 = dirX + Math.sin(arrowAngle2) * arrowSize
            const arrowY2 = dirY - Math.cos(arrowAngle2) * arrowSize
            
            // Draw arrow
            ctx.beginPath()
            ctx.moveTo(dirX, dirY)
            ctx.lineTo(arrowX1, arrowY1)
            ctx.lineTo(arrowX2, arrowY2)
            ctx.closePath()
            ctx.fillStyle = marker.sceneKey === activeSceneKey ? 'rgba(255, 165, 0, 0.9)' : 'white'
            ctx.fill()
          }
        }
      }
      
      // Only draw labels if expanded or if it's the active scene
      if (isExpanded || marker.sceneKey === activeSceneKey) {
        ctx.fillStyle = 'white'
        ctx.font = '10px Arial'
        ctx.fillText(marker.label.substring(0, 15), x + 8, y + 3)
      }
    })
  }, [markers, activeSceneKey, isExpanded, scenes])
  
  // Handle canvas click to navigate to a scene
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return
    
    // Get mouse coordinates relative to canvas
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Find clicked marker
    const clickedMarker = markers.find(marker => {
      const markerX = marker.x * rect.width
      const markerY = marker.y * rect.height
      const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2))
      return distance <= 10 // 10px click radius
    })
    
    if (clickedMarker) {
      dispatch(setActiveScene({ sceneKey: clickedMarker.sceneKey }))
      dispatch(triggerRefresh())
    }
  }
  
  // Handle opening the floor plan editor
  const handleGoToMapTab = () => {
    dispatch(setActiveView({ view: 'map' }))
  }
  
  return (
    <div 
      className={`relative border border-neutral-700 bg-black bg-opacity-20 transition-all ${
        isExpanded ? 'h-56' : 'h-24'
      }`}
    >
      {/* Controls */}
      <div className="absolute top-1 right-1 z-20 flex space-x-1">
        <button
          className="bg-purple-700 px-2 py-1 text-xs"
          onClick={handleGoToMapTab}
        >
          Edit Map
        </button>
        <button
          className="bg-black bg-opacity-50 px-2 py-1 text-xs"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      {/* Title */}
      <div className="absolute top-1 left-1 z-20 bg-black bg-opacity-60 px-2 py-1 text-xs text-white">
        Floor Plan
      </div>
      
      {/* Floor plan image */}
      {floorPlanPath ? (
        <>
          <img
            src={floorPlanPath}
            alt="Floor Plan"
            className="absolute w-full h-full object-contain opacity-70"
          />
          <canvas
            ref={canvasRef}
            className="absolute w-full h-full z-10 cursor-pointer"
            onClick={handleCanvasClick}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm opacity-50">No floor plan available</p>
        </div>
      )}
    </div>
  )
}

export default MiniMap