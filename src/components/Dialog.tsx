import React, { useEffect } from 'react'

// maxWidth options: 'sm', 'md', 'lg', 'xl', 'full'
const Dialog = ({ children, isOpen, onClose, maxWidth = 'sm' }) => {
	// Add key listener for ESC key to close dialog
	useEffect(() => {
		const handleEsc = (event) => {
			if (event.key === 'Escape' && isOpen) {
				onClose()
			}
		}
		
		window.addEventListener('keydown', handleEsc)
		
		// If dialog is open, prevent background scrolling
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		}
		
		// Cleanup
		return () => {
			window.removeEventListener('keydown', handleEsc)
			document.body.style.overflow = 'auto'
		}
	}, [isOpen, onClose])
	
	// Click outside to close
	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	if (!isOpen) return null

	// Width classes based on size
	const widthClasses = {
		sm: 'max-w-md',
		md: 'max-w-2xl',
		lg: 'max-w-4xl',
		xl: 'max-w-6xl',
		full: 'max-w-[90vw]'
	}

	return (
		<div 
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
			onClick={handleBackdropClick}
		>
			<div 
				className={`relative z-50 bg-gray-800 rounded-lg shadow-xl max-h-[90vh] ${widthClasses[maxWidth]} overflow-auto`}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}

export default Dialog