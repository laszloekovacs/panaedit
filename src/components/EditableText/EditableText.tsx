import React, { useEffect, useRef } from 'react'

/* shows a text. on clicking it turns into editable, if cancelled
 * it reverts into its original value. loosing focus cancels the edit
 */

const EditableText = ({ value, onDoneEditing }) => {
	const [isEditing, setIsEditing] = React.useState(false)
	const [text, setText] = React.useState(value)

	const inputRef = useRef<HTMLInputElement>(null)

	/* update text when value changes */
	useEffect(() => {
		setText(value)
	}, [value])

	/* focus when the component gets redrawn as editable */
	useEffect(() => {
		if (isEditing) {
			inputRef?.current?.focus()
		}
	}, [isEditing])

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			setIsEditing(false)
			onDoneEditing(text)
		}
		if (e.key === 'Escape') {
			setIsEditing(false)
			onDoneEditing(value)
		}
	}

	/* change to editor when the text gets clicked */
	const handleClick = (e) => {
		setIsEditing(true)
	}

	/* revert when user click outside */
	const handleBlur = (e) => {
		setIsEditing(false)
		setText(value)
		onDoneEditing(value)
	}

	return (
		<div className="editable-text">
			{isEditing ? (
				<input
					ref={inputRef}
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
				/>
			) : (
				<span onClick={handleClick}>{text}</span>
			)}
		</div>
	)
}

export default EditableText
