import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEditor } from '../hooks/useEditor'
import { 
  setActiveScene, 
  triggerRefresh,
  setFloorPlanImage,
  addFloorPlanMarker,
  updateFloorPlanMarker,
  removeFloorPlanMarker,
  setActiveView
} from '../store'
import { filterCache } from '../functions'
import Dialog from './Dialog'
import EditableLabel from './EditableLabel'
import useDragHandler from '../hooks/useDragHandler'

const FloorPlanEditor = () => {
  const dispatch = useDispatch()
  const { scenes, activeSceneKey, cache } = useEditor()
  const [isEditMode, setIsEditMode] = useState(true)
  const [isDragMode, setIsDragMode] = useState(false)
  const [showSceneDialog, setShowSceneDialog] = useState(false)
  const [currentMarker, setCurrentMarker] = useState<FloorPlanMarker | null>(null)
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  
  // Get floor plan images from the photos directory
  const floorPlans = filterCache(cache, /photos/)
  
  // Get floor plan data from Redux store
  const floorPlan = useSelector((state: State) => state.floorPlan || { imagePath: '', markers: [] })
  const selectedPlan = floorPlan?.imagePath || null
  const markers = floorPlan?.markers || []
  
  // Set up drag handling
  const { isDragging, dragTarget, setDragTarget } = useDragHandler(canvasRef, {
    onDragStart: (position) => {
      if (!isEditMode || !isDragMode) return
      
      // Find if we clicked on a marker
      const rect = canvasRef.current.getBoundingClientRect()
      const clickedMarker = markers.find(marker => {
        const markerX = marker.x * rect.width
        const markerY = marker.y * rect.height
        const clickX = position.x * rect.width
        const clickY = position.y * rect.height
        const distance = Math.sqrt(Math.pow(clickX - markerX, 2) + Math.pow(clickY - markerY, 2))
        return distance <= 15 // 15px click radius
      })
      
      if (clickedMarker) {
        setDragTarget(clickedMarker.id)
        setSelectedMarkerId(clickedMarker.id)
      }
    },
    onDrag: (position) => {
      if (!dragTarget || !isEditMode || !isDragMode) return
      
      // Update marker position during drag
      const marker = markers.find(m => m.id === dragTarget)
      if (marker) {
        dispatch(updateFloorPlanMarker({
          id: marker.id,
          updates: {
            x: position.x,
            y: position.y
          }
        }))
      }
    },
    onDragEnd: (position) => {
      if (!dragTarget || !isEditMode || !isDragMode) return
      
      // Final update to marker position
      const marker = markers.find(m => m.id === dragTarget)
      if (marker) {
        dispatch(updateFloorPlanMarker({
          id: marker.id,
          updates: {
            x: position.x,
            y: position.y
          }
        }))
      }
    }
  })
  
  // Handle canvas click - only for adding new markers, not for dragging
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current || !isEditMode || isDragMode) return
    
    // Get mouse coordinates relative to canvas
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    // Check if clicking on an existing marker
    const clickedMarker = markers.find(marker => {
      const markerX = marker.x * rect.width
      const markerY = marker.y * rect.height
      const distance = Math.sqrt(Math.pow(e.clientX - rect.left - markerX, 2) + 
                                Math.pow(e.clientY - rect.top - markerY, 2))
      return distance <= 15 // 15px click radius
    })
    
    if (clickedMarker) {
      // Select this marker
      setSelectedMarkerId(clickedMarker.id)
    } else {
      // Add a new marker
      const markerId = `marker-${Date.now()}`
      const newMarker: FloorPlanMarker = {
        id: markerId,
        x,
        y,
        sceneKey: '',
        label: 'New Marker'
      }
      
      setCurrentMarker(newMarker)
      setShowSceneDialog(true)
    }
  }
  
  // Handle marker creation after scene selection
  const handleMarkerSceneAssign = (sceneKey: string) => {
    if (!currentMarker) return
    
    const updatedMarker = {
      ...currentMarker,
      sceneKey,
      label: scenes[sceneKey]?.title || 'Unnamed Scene'
    }
    
    // Add the marker to Redux store
    dispatch(addFloorPlanMarker({ marker: updatedMarker }))
    
    setShowSceneDialog(false)
    setCurrentMarker(null)
  }
  
  // Handle updating marker label
  const handleUpdateMarkerLabel = (label: string) => {
    if (!selectedMarkerId) return
    
    dispatch(updateFloorPlanMarker({ 
      id: selectedMarkerId, 
      updates: { label } 
    }))
  }
  
  // Handle marker removal
  const handleRemoveMarker = () => {
    if (!selectedMarkerId) return
    
    dispatch(removeFloorPlanMarker({ id: selectedMarkerId }))
    setSelectedMarkerId(null)
  }
  
  // Handle marker click to navigate to scene
  const handleMarkerClick = (marker: FloorPlanMarker) => {
    if (!isEditMode && marker.sceneKey) {
      dispatch(setActiveScene({ sceneKey: marker.sceneKey }))
      dispatch(triggerRefresh())
    }
  }
  
  // Auto-generate markers for all scenes
  const handleAutoGenerateMarkers = () => {
    // Get all scene keys
    const sceneKeys = Object.keys(scenes)
    
    if (sceneKeys.length === 0) {
      alert('No scenes available to create markers for.')
      return
    }
    
    // Confirm before replacing any existing markers
    if (markers.length > 0) {
      if (!confirm('This will replace all existing markers. Continue?')) {
        return
      }
    }
    
    // Calculate a grid layout based on number of scenes
    const totalScenes = sceneKeys.length
    const cols = Math.ceil(Math.sqrt(totalScenes))
    const rows = Math.ceil(totalScenes / cols)
    
    // Space between markers (as proportion of canvas)
    const margin = 0.1
    const availableWidth = 1 - (2 * margin)
    const availableHeight = 1 - (2 * margin)
    
    // Cell width and height
    const cellWidth = availableWidth / cols
    const cellHeight = availableHeight / rows
    
    // Create markers in a grid pattern
    const newMarkers = sceneKeys.map((sceneKey, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      
      // Calculate position (centered in cell with margins)
      const x = margin + (col * cellWidth) + (cellWidth / 2)
      const y = margin + (row * cellHeight) + (cellHeight / 2)
      
      return {
        id: `marker-${Date.now()}-${index}`,
        x,
        y,
        sceneKey,
        label: scenes[sceneKey].title || sceneKey
      }
    })
    
    // Clear existing markers and add new ones
    // In a real implementation with Redux, we would use a batch update
    newMarkers.forEach(marker => {
      dispatch(addFloorPlanMarker({ marker }))
    })
  }

  // Draw markers on canvas whenever they change or active scene changes
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
      ctx.strokeStyle = 'rgba(180, 180, 180, 0.6)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 3])
      
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
    
    // Draw all markers
    markers.forEach(marker => {
      const x = marker.x * canvas.width
      const y = marker.y * canvas.height
      
      // Draw marker circle
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, 2 * Math.PI)
      
      // Highlight active scene marker or selected marker
      if (marker.sceneKey === activeSceneKey) {
        ctx.fillStyle = 'rgba(255, 165, 0, 0.8)' // Orange for active scene
      } else if (marker.id === selectedMarkerId) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.6)' // Red for selected marker
      } else {
        ctx.fillStyle = 'rgba(0, 120, 255, 0.6)' // Blue for normal markers
      }
      
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'white'
      ctx.stroke()
      
      // Draw direction indicator if this marker has a scene with northOffset
      if (marker.sceneKey && scenes[marker.sceneKey]) {
        const scene = scenes[marker.sceneKey]
        if (scene.northOffset !== undefined) {
          // Convert north offset to radians (northOffset is in degrees)
          const angleRad = (scene.northOffset * Math.PI) / 180
          
          // Calculate direction line endpoint
          const lineLength = 15
          const dirX = x + Math.sin(angleRad) * lineLength
          const dirY = y - Math.cos(angleRad) * lineLength
          
          // Draw direction line
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(dirX, dirY)
          ctx.strokeStyle = marker.sceneKey === activeSceneKey ? 'rgba(255, 165, 0, 0.9)' : 'white'
          ctx.lineWidth = 2
          ctx.stroke()
          
          // Draw arrowhead
          const arrowSize = 5
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
      
      // Draw label
      ctx.fillStyle = 'white'
      ctx.font = '12px Arial'
      ctx.fillText(marker.label, x + 15, y + 5)
    })
  }, [markers, activeSceneKey, selectedMarkerId])
  
  // Handle plan selection
  const handleSelectPlan = (planPath: string) => {
    dispatch(setFloorPlanImage({ path: planPath }))
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex justify-between items-center">
        <h2>Floor Plan Editor</h2>
        <div className="flex space-x-2">
          {isEditMode && (
            <button 
              className={isDragMode ? 'bg-green-700' : 'bg-stone-800'} 
              onClick={() => setIsDragMode(!isDragMode)}
            >
              {isDragMode ? 'Drag Mode' : 'Place Mode'}
            </button>
          )}
          <button 
            className={isEditMode ? 'bg-green-700' : 'bg-stone-800'} 
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Edit Mode' : 'View Mode'}
          </button>
        </div>
      </div>
      
      {!selectedPlan ? (
        <div className="mb-4">
          <h3 className="mb-2">Select a Floor Plan</h3>
          <div className="grid grid-cols-3 gap-2">
            {floorPlans.map(plan => (
              <div 
                key={plan.key} 
                className="cursor-pointer border hover:border-purple-500"
                onClick={() => handleSelectPlan(plan.value)}
              >
                <img 
                  src={plan.value} 
                  alt={plan.key.split('/').pop()} 
                  className="w-full h-32 object-cover"
                />
                <p className="text-sm p-1 truncate bg-black bg-opacity-30 text-white">
                  {plan.key.split('/').pop()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col md:flex-row gap-4">
          {/* Floor Plan Canvas */}
          <div className="relative flex-grow border-2 border-neutral-700 h-96 md:h-auto">
            <img
              ref={imgRef}
              src={selectedPlan}
              alt="Floor Plan"
              className="absolute w-full h-full object-contain"
            />
            <canvas
              ref={canvasRef}
              className="absolute w-full h-full z-10 cursor-pointer"
              onClick={handleCanvasClick}
            />
            
            {/* Help overlay for edit mode */}
            {isEditMode && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 text-sm">
                {isDragMode 
                  ? 'Click and drag markers to reposition them' 
                  : 'Click to add markers or select existing markers'}
              </div>
            )}
          </div>
          
          {/* Marker Controls */}
          <div className="w-full md:w-64 flex-shrink-0">
            <h3 className="mb-2">Markers</h3>
            
            {selectedMarkerId ? (
              <div className="bg-slate-900 bg-opacity-30 p-2">
                <h4 className="font-bold">Selected Marker</h4>
                {markers.find(m => m.id === selectedMarkerId)?.label && (
                  <div className="mb-2">
                    <span className="opacity-70 mr-2">Label:</span>
                    <EditableLabel 
                      value={markers.find(m => m.id === selectedMarkerId)?.label || ''}
                      onDoneEditing={handleUpdateMarkerLabel}
                    />
                  </div>
                )}
                <div className="mb-2">
                  <span className="opacity-70 mr-2">Scene:</span>
                  <span>{markers.find(m => m.id === selectedMarkerId)?.sceneKey || 'None'}</span>
                </div>
                <button 
                  className="bg-red-700"
                  onClick={handleRemoveMarker}
                >
                  Remove Marker
                </button>
              </div>
            ) : (
              <p className="text-sm opacity-70">
                {isEditMode 
                  ? 'Click on a marker to select it or click on the map to create a new marker.' 
                  : 'Click on markers to navigate to scenes.'}
              </p>
            )}
            
            <div className="mt-4">
              <h4 className="font-bold mb-2">All Markers</h4>
              <ul className="text-sm max-h-72 overflow-y-auto">
                {markers.map(marker => (
                  <li 
                    key={marker.id} 
                    className={`p-2 cursor-pointer hover:bg-slate-900 hover:bg-opacity-30 ${
                      marker.id === selectedMarkerId ? 'bg-slate-900 bg-opacity-30' : ''
                    }`}
                    onClick={() => {
                      if (isEditMode) {
                        setSelectedMarkerId(marker.id)
                      } else {
                        handleMarkerClick(marker)
                      }
                    }}
                  >
                    <div className="font-bold">{marker.label}</div>
                    <div className="opacity-70 text-xs">Scene: {marker.sceneKey}</div>
                  </li>
                ))}
                {markers.length === 0 && (
                  <li className="italic opacity-50">No markers yet</li>
                )}
              </ul>
            </div>
            
            {selectedPlan && (
              <div className="mt-4 space-y-2">
                {/* Auto-Generate Markers Button */}
                <button 
                  className="bg-purple-700"
                  onClick={handleAutoGenerateMarkers}
                >
                  Auto-Generate Markers
                </button>
                
                <button 
                  className="bg-red-700"
                  onClick={() => dispatch(setFloorPlanImage({ path: '' }))}
                >
                  Change Floor Plan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Scene Selection Dialog */}
      <Dialog isOpen={showSceneDialog} onClose={() => setShowSceneDialog(false)}>
        <div className="p-4 w-80">
          <h2 className="text-lg font-bold mb-4">Select a Scene for this Marker</h2>
          <ul className="max-h-96 overflow-y-auto">
            {Object.entries(scenes).map(([key, scene]) => (
              <li 
                key={key}
                className="p-2 cursor-pointer hover:bg-slate-900 hover:bg-opacity-30"
                onClick={() => handleMarkerSceneAssign(key)}
              >
                <div className="font-bold">{scene.title}</div>
                <div className="opacity-70 text-xs">Key: {key}</div>
              </li>
            ))}
          </ul>
        </div>
      </Dialog>
    </div>
  )
}

export default FloorPlanEditor