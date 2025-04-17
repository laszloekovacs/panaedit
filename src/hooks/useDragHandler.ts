import { useRef, useEffect, useState } from 'react'

type DragPosition = {
  x: number
  y: number
}

type UseDragHandlerOptions = {
  onDragStart?: (position: DragPosition) => void
  onDrag?: (position: DragPosition) => void
  onDragEnd?: (position: DragPosition) => void
}

// A hook to handle dragging operations on a canvas
const useDragHandler = (canvasRef: React.RefObject<HTMLCanvasElement>, options: UseDragHandlerOptions = {}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragTarget, setDragTarget] = useState<string | null>(null)
  const dragStartPos = useRef<DragPosition | null>(null)
  
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    
    const handleMouseDown = (e: MouseEvent) => {
      if (!canvas) return
      
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      // Store normalized coordinates (0-1 range)
      dragStartPos.current = { x, y }
      
      if (options.onDragStart) {
        options.onDragStart({ x, y })
      }
      
      setIsDragging(true)
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !canvas) return
      
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      // Clamp values to 0-1 range
      const clampedX = Math.max(0, Math.min(1, x))
      const clampedY = Math.max(0, Math.min(1, y))
      
      if (options.onDrag) {
        options.onDrag({ x: clampedX, y: clampedY })
      }
    }
    
    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging || !canvas) return
      
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      // Clamp values to 0-1 range
      const clampedX = Math.max(0, Math.min(1, x))
      const clampedY = Math.max(0, Math.min(1, y))
      
      if (options.onDragEnd) {
        options.onDragEnd({ x: clampedX, y: clampedY })
      }
      
      setIsDragging(false)
      setDragTarget(null)
      dragStartPos.current = null
    }
    
    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [canvasRef, isDragging, options])
  
  return {
    isDragging,
    dragTarget,
    setDragTarget
  }
}

export default useDragHandler