import React from 'react'

import TabSelector from './TabSelector'

/* switches between preview, scenes, articles, etc */
const TabbedPanel = ({ options, components }) => {
	const [activeTab, setActiveTab] = React.useState(options[0])

	const handleViewChange = (e) => {
		setActiveTab(e.target.value)
	}

	const Component = components[options.indexOf(activeTab)]

	return (
		<div>
			<TabSelector options={options} value={activeTab} onChange={handleViewChange} />
			<Component />
		</div>
	)
}

export default TabbedPanel
