import React, { useEffect, useRef } from 'react'

/* shows a string. on clicking it turns into editable, if cancelled
 * it reverts into its original value. loosing focus cancels the edit
 */

const EditableLabel = ({ value, onDoneEditing }) => {
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

	/* stop editing when pressing enter, or cancel on escape */
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

	/* handle change */
	const handleChange = (e) => {
		setText(e.target.value)
	}

	return (
		<span>
			{isEditing ? (
				<input
					className="editable"
					ref={inputRef}
					type="text"
					value={text}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
				/>
			) : (
				<span className="editable inline" onClick={handleClick}>
					{text}
					<img className="inline" src="/img/edit.svg" width="18rem" />
				</span>
			)}
		</span>
	)
}

export default EditableLabel
