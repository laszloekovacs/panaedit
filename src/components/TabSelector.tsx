// @ts-nocheck
import React from 'react'

const TabSelector = ({ options, selected, onChange }) => {
	return (
		<ul className="flex flex-row justify-center">
			{options.map((option) => (
				<li
					key={option.label}
					className="mx-2 border-b-2 border-b-violet-500"
				>
					<label key={option.label} htmlFor={option.label}>
						<span>{option.label}</span>
					</label>
					<input
						className="hidden"
						id={option.label}
						type="radio"
						name="tab"
						value={option.label}
						defaultChecked={selected.label === option.label}
						onChange={() => onChange(option)}
					/>
				</li>
			))}
		</ul>
	)
}

export default TabSelector
