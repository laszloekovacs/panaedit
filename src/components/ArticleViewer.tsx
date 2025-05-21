import React, { useState, useEffect } from 'react'
import ArticleDialog from './ArticleDialog'

// This component can be placed in your main layout to listen for article open events
const ArticleViewer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [articlePath, setArticlePath] = useState('')

  // Listen for the custom openArticle event
  useEffect(() => {
    const handleOpenArticle = (event: CustomEvent) => {
      const { articlePath } = event.detail
      setArticlePath(articlePath)
      setIsOpen(true)
    }

    // Add event listener for our custom event
    window.addEventListener('openArticle', handleOpenArticle as EventListener)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('openArticle', handleOpenArticle as EventListener)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <ArticleDialog 
      isOpen={isOpen} 
      onClose={handleClose} 
      articlePath={articlePath} 
    />
  )
}

export default ArticleViewer