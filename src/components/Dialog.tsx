import React from 'react'

const Dialog = ({ children, isOpen, onClose }) => {
	if (!isOpen) return null

	return (
		<dialog className="z-50" open={isOpen}>
			{children}
			<button onClick={onClose}>close</button>
		</dialog>
	)
}

export default Dialog
