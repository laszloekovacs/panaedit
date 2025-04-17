import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addHotspot, triggerRefresh } from '../store'
import { useEditor } from '../hooks/useEditor'
import Dialog from './Dialog'
import { filterCache } from '../functions'

const HotspotAddArticle = () => {
	const dispatch = useDispatch()
	const { activeSceneKey, editor, cache } = useEditor()
	const [showDialog, setShowDialog] = useState(false)

	// Filter articles from the cache
	const articles = filterCache(cache, /articles/)

	const handleOpenDialog = () => {
		setShowDialog(true)
	}

	const handleClose = () => {
		setShowDialog(false)
	}

	const handleSelectArticle = (articleKey) => {
		// Find the selected article from the cache
		const selectedArticle = cache.find(item => item.key === articleKey)
		
		if (!selectedArticle) return

		// Clean filename for display
		const filename = articleKey.split('/').pop() || 'Article'

		const hotspot: Hotspot = {
			type: 'article',
			yaw: editor.yaw,
			pitch: editor.pitch,
			text: 'Article: ' + filename,
			targetYaw: 'sameAzimuth',
			// IMPORTANT: Don't set URL property as it triggers default browser behavior
			// URL: selectedArticle.value, <- REMOVE THIS
			// Add click handler to open the article and prevent default behavior
			clickHandlerFuncStr: `function(e, args) {
				// Prevent default behavior
				e.preventDefault();
				
				// Create a custom event to open the article
				const event = new CustomEvent('openArticle', { 
					detail: { articlePath: args.articlePath }
				});
				window.dispatchEvent(event);
				
				// Return false to prevent any default Pannellum behavior
				return false;
			}`,
			clickHandlerArgs: { 
				articlePath: articleKey
			}
		}

		dispatch(addHotspot({ sceneKey: activeSceneKey, hotspot }))
		dispatch(triggerRefresh())
		setShowDialog(false)
	}

	return (
		<div className="flex flex-row">
			<button onClick={handleOpenDialog}>add article</button>
			
			<Dialog isOpen={showDialog} onClose={handleClose}>
				<div className="p-4">
					<h2>Select Article</h2>
					<div className="grid grid-cols-1 gap-2 mt-4 max-h-96 overflow-y-auto">
						{articles.map((article) => (
							<div 
								key={article.key} 
								className="cursor-pointer border hover:border-purple-500 p-2"
								onClick={() => handleSelectArticle(article.key)}
							>
								<p className="font-medium">{article.key.split('/').pop()}</p>
							</div>
						))}
						
						{articles.length === 0 && (
							<p>No articles found. Please add some article files to your articles folder.</p>
						)}
					</div>
				</div>
			</Dialog>
		</div>
	)
}

export default HotspotAddArticle