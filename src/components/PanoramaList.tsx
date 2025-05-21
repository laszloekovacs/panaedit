import React from 'react'
import { useDispatch } from 'react-redux'
import PanoramaListItem from './PanoramaListItem'
import { useEditor } from '../hooks/useEditor'
import { filterCache } from '../functions/filterCache'
import { addScene } from '../store'

const PanoramaList = () => {
  const dispatch = useDispatch()
  const { cache, scenes } = useEditor()
  const list = filterCache(cache, /panoramas/)

  const handleAddAllPanoramas = () => {
    // Loop through all panoramas in the list and add each one as a scene
    list.forEach(item => {
      dispatch(addScene({ path: item.key }))
    })
  }

  return (
    <div>
      <button className="mb-2" onClick={handleAddAllPanoramas}>
        Add all panoramas
      </button>
      <ul className="mb-8 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
        {list.map((item, index) => (
          <PanoramaListItem key={index} item={item} scenes={scenes} />
        ))}
      </ul>
    </div>
  )
}

export default PanoramaList