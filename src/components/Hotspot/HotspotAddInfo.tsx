import React from 'react'
import Dialog from '../Dialog/Dialog'

const HotspotAddInfo = () => {
	const [isOpen, setIsOpen] = React.useState(false)

	const openDialog = () => {
		setIsOpen(true)
	}

	const closeDialog = () => {
		setIsOpen(false)
	}

	return (
		<div className="flex flex-row">
			<button onClick={openDialog}>add info</button>
			<Dialog isOpen={isOpen} onClose={closeDialog}>
				<p>hello</p>
			</Dialog>
		</div>
	)
}

export default HotspotAddInfo
