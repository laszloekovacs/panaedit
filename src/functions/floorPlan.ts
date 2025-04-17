/* Set floor plan image */
export function _setFloorPlanImage(
    state: State,
    action: {
      payload: {
        path: string
      }
    }
  ) {
    const { path } = action.payload
    
    state.floorPlan.imagePath = path
    
    return state
  }
  
  /* Add marker to floor plan */
  export function _addFloorPlanMarker(
    state: State,
    action: {
      payload: {
        marker: FloorPlanMarker
      }
    }
  ) {
    const { marker } = action.payload
    
    state.floorPlan.markers.push(marker)
    
    return state
  }
  
  /* Update marker on floor plan */
  export function _updateFloorPlanMarker(
    state: State,
    action: {
      payload: {
        id: string
        updates: Partial<FloorPlanMarker>
      }
    }
  ) {
    const { id, updates } = action.payload
    
    const markerIndex = state.floorPlan.markers.findIndex(marker => marker.id === id)
    
    if (markerIndex !== -1) {
      state.floorPlan.markers[markerIndex] = {
        ...state.floorPlan.markers[markerIndex],
        ...updates
      }
    }
    
    return state
  }
  
  /* Remove marker from floor plan */
  export function _removeFloorPlanMarker(
    state: State,
    action: {
      payload: {
        id: string
      }
    }
  ) {
    const { id } = action.payload
    
    state.floorPlan.markers = state.floorPlan.markers.filter(marker => marker.id !== id)
    
    return state
  }
  
  /* Clear all markers from floor plan */
  export function _clearFloorPlanMarkers(state: State) {
    state.floorPlan.markers = []
    
    return state
  }