// @ts-nocheck
import React from 'react'
import style from './Layout.module.scss'

const LayoutSelector = ({ options, active, onChange }) => {
	return (
		<ul className={style.layoutSelector}>
			{options.map((option) => (
				<li key={option}>
					<label htmlFor={option}>{option}</label>

					<input
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

export default LayoutSelector
