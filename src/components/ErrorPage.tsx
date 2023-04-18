import React from 'react'

const Error = ({ message }) => {
	const onClick = () => {
		location.reload()
	}

	return (
		<div className="m-auto flex h-full w-10/12 flex-col justify-center">
			<div>
				<h2 className="text-6xl font-bold">Oh snap...</h2>
				<br />
				<p>{message}</p>
				<br />
				<button onClick={onClick}>reload</button>
			</div>
		</div>
	)
}

export default Error
