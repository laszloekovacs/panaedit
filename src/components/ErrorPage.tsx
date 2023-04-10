import React from 'react'

const Error = ({ message }) => {
	const onClick = () => {
		location.reload()
	}

	return (
		<div>
			<div>
				<h2>Oh snap...</h2>
				<br />
				<p>{message}</p>
				<br />
				<button onClick={onClick}>reload</button>
			</div>
		</div>
	)
}

export default Error
