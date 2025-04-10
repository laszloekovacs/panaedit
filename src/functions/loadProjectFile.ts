import { loadProject } from '../store'

// Helper function to fetch and convert blob URLs to actual Blob objects
const convertBlobUrlToBlob = async (blobUrl) => {
  try {
    const response = await fetch(blobUrl);
    return await response.blob();
  } catch (error) {
    console.error('Error converting blob URL to blob:', error);
    return null;
  }
}

// Process panorama scenes to ensure proper blob objects
const processPanoramaScenes = async (scenes) => {
  const processedScenes = { ...scenes };
  
  for (const sceneKey in processedScenes) {
    const scene = processedScenes[sceneKey];
    
    if (scene.panorama && scene.panorama.startsWith('blob:')) {
      // Convert the blob URL to an actual Blob object
      const blob = await convertBlobUrlToBlob(scene.panorama);
      
      if (blob) {
        // Create a new blob URL from the actual blob to avoid caching issues
        URL.revokeObjectURL(scene.panorama); // Revoke the old URL to prevent memory leaks
        scene.panorama = URL.createObjectURL(blob);
      }
    }
  }
  
  return processedScenes;
}

const fileOptions = {
  types: [
    {
      description: 'json document',
      accept: { 'application/json': ['.json'] }
    }
  ]
}

type fn = (window: Window, dispatch) => void

export const loadProjectFile: fn = async (window, dispatch) => {
  try {
    const [filehandle] = await window.showOpenFilePicker(fileOptions)

    const file = await filehandle.getFile()
    const text = await file.text()

    if (!file || !text) {
      throw new Error('cannot load file')
    } else {
      const data = JSON.parse(text)
      
      // Process panorama scenes if they exist
      if (data.scenes) {
        data.scenes = await processPanoramaScenes(data.scenes);
      }
      
      dispatch(loadProject({ project: data }))
    }
  } catch (error) {
    console.error('Error loading project file:', error)
  }
}