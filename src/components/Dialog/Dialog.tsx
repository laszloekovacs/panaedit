import React from 'react'

type Props = {
	isOpen: boolean
	children?: React.ReactNode
	onClose: (args?: unknown) => void
}

const style = 'bg-white w-1/2 h-1/2 z-10'

const Dialog = (props: Props) => {
	return (
		<dialog role="dialog" className={style} open={props.isOpen}>
			{props.children}
			<button onClick={props.onClose}>Close</button>
		</dialog>
	)
}

export default Dialog
