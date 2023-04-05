import React from 'react'

const TabSelector = ({ options, value, onChange }) => {
	return (
		<div>
			{options.map((tab) => (
				<label key={tab} htmlFor={tab}>
					<span>{tab}</span>
					<input id={tab} type="radio" name="views" value={tab} checked={tab == value} onChange={onChange} />
				</label>
			))}
		</div>
	)
}

export default TabSelector
