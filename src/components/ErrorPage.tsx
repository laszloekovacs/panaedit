import React from 'react'

const Error = ({ message }) => {
	const onClick = () => {
		location.reload()
	}

	return (
		<div className="flex flex-col justify-center w-10/12 m-auto h-full">
			<div>
				<h2 className="font-bold text-6xl">Oh snap...</h2>
				<br />
				<p>{message}</p>
				<br />
				<button onClick={onClick}>reload</button>
			</div>
		</div>
	)
}

export default Error
