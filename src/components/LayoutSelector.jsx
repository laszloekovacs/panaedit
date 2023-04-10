// @ts-nocheck
import React from 'react'

const TabSelector = ({ options, active, onChange }) => {
	console.log(options)

	return (
		<ul className="flex flex-row justify-center">
			{options.map((option) => (
				<li
					key={option}
					className="mx-2 border-b-2 border-b-violet-500"
				>
					<label htmlFor={option}>{option}</label>

					<input
						className="hidden"
						id={option}
						type="radio"
						name="tab"
						value={option}
						defaultChecked={active === option}
						onChange={() => onChange(option)}
					/>
				</li>
			))}
		</ul>
	)
}

export default TabSelector
