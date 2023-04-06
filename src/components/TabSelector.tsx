// @ts-nocheck
import React from 'react'

const TabSelector = ({ options, selected, onChange }) => {
	return (
		<div className="flex flex-row justify-center">
			{options.map((option) => (
				<div
					key={option.label}
					className="border-b-2 border-b-violet-500"
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
				</div>
			))}
		</div>
	)
}

export default TabSelector
