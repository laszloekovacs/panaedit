import React, { useState } from 'react'
import SceneListItem from './SceneListItem'
import { useEditor } from '../hooks/useEditor'
import { resolvePathsToBlobUrl } from '../functions/resolvePathsToBlobUrl'
import _ from 'lodash'

// Grid view item component with image thumbnail
const SceneGridItem = ({ sceneKey, title, isFirst, isActive, onClick, numHotspots, panoramaUrl }) => {
  return (
    <div 
      onClick={() => onClick(sceneKey)}
      className="group relative cursor-pointer border rounded overflow-hidden hover:border-blue-500"
    >
      <div className="relative aspect-video bg-neutral-900 bg-opacity-10">
        {/* Image thumbnail */}
        <img 
          src={panoramaUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with scene info */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-2">
          <div className="flex justify-between">
            {isFirst && (
              <span className="text-yellow-500 text-sm">★ Start</span>
            )}
            {numHotspots > 0 && (
              <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                {numHotspots} hotspots
              </span>
            )}
          </div>
          
          <div className="text-white">
            <p className="text-sm font-medium truncate">{title}</p>
            <p className="text-xs opacity-70 truncate">{sceneKey}</p>
          </div>
        </div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Select</span>
        </div>
      </div>
    </div>
  )
}

const LinkSceneList = ({ onClick }) => {
  const { state, scenes, activeSceneKey, cache } = useEditor()
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'

  // Get scene data with panorama URLs
  const sceneList = _.map(scenes, (scene, key) => {
    let panoramaUrl = '';
    
    try {
      // Try to resolve the panorama path to a blob URL
      if (scene.panorama) {
        panoramaUrl = resolvePathsToBlobUrl(scene.panorama, cache);
      }
    } catch (error) {
      console.error(`Could not resolve panorama for scene ${key}:`, error);
    }
    
    return {
      title: scene.title,
      sceneKey: key,
      isFirst: state.default.firstScene === key,
      isActive: activeSceneKey === key,
      onClick: onClick,
      numHotspots: scene.hotSpots.length,
      panoramaUrl: panoramaUrl
    }
  }).filter((item) => item.isActive === false) // Exclude the active scene

  // Toggle between list and grid view
  const toggleView = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list')
  }

  return (
    <div className="bg-gray-800 bg-opacity-80 rounded shadow-lg p-4 max-h-[75vh] w-full overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Select Target Scene</h3>
        <button 
          onClick={toggleView} 
          className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
        >
          {viewMode === 'list' ? 'Grid View' : 'List View'}
        </button>
      </div>
      
      <div className={`overflow-y-auto ${viewMode === 'grid' ? 'flex-grow' : 'max-h-full'}`}>
        {viewMode === 'list' ? (
          <ul className="divide-y divide-gray-700 w-full">
            {sceneList && sceneList.map((item) => (
              <SceneListItem key={item.sceneKey} {...item} />
            ))}
          </ul>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sceneList && sceneList.map((item) => (
              <SceneGridItem key={item.sceneKey} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LinkSceneList