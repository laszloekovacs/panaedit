import React from 'react'

const Error = ({ message }) => {
	return (
		<div>
			<h2>Oh snap...</h2>
			<hr />
			<p>{message}</p>
		</div>
	)
}

export default Error
