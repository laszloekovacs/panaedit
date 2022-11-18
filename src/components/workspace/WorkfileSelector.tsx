import React, { useState } from 'react'
import WorkfileList from './WorkfileList'


function WorkfileSelector({ children }) {

  const [isLoaded, setLoaded] = useState(false)

  if (isLoaded) {
    return <>{children}</>
  } else {

    return (
      <div>
        <h2>Select a project file from the working directory or create a new scene</h2>
        <button>load project...</button>
        <button>new empty project</button>

        <WorkfileList></WorkfileList>
      </div>
    )
  }
}

export default WorkfileSelector