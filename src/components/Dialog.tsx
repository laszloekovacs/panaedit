import React from 'react'

const Dialog = ({ children, isOpen, onClose }) => {
	return (
		<dialog role="dialog" className="z-10 min-h-1/2 min-w-1/2 bg-white" open={isOpen}>
			{children}
			<button onClick={onClose}>Close</button>
		</dialog>
	)
}

export default Dialog
