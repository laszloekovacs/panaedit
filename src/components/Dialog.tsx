import React from 'react'

const Dialog = ({ children, isOpen, onClose }) => {
	if (!isOpen) return null

	return (
		<div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-purple-200 bg-opacity-10">
			<dialog className="z-50 mx-auto" open={isOpen}>
				{children}
				<button onClick={onClose}>close</button>
			</dialog>
		</div>
	)
}

export default Dialog
