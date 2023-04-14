// @ts-nocheck
import React from 'react'

const LayoutSelector = ({ options, active, onChange }) => {
	return (
		<ul className="mb-6 flex flex-row flex-nowrap justify-center gap-0">
			{options.map((option) => (
				<li key={option} data-selected={active == option}>
					<input
						className="peer"
						id={option}
						type="radio"
						name="tab"
						value={option}
						defaultChecked={active === option}
						onChange={() => onChange(option)}
					/>

					<label
						className="cursor-pointer px-3 peer-checked:bg-black peer-checked:text-white"
						htmlFor={option}
					>
						{option}
					</label>
				</li>
			))}
		</ul>
	)
}

export default LayoutSelector
