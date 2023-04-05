import React from 'react'

import ViewSelector from './ViewSelector'
import Preview from '../Preview/Preview'
import ScenesView from '../ScenesView/ScenesView'

const tabs = ['Scenes', 'Preview']
const components = [ScenesView, Preview]

/* switches between preview, scenes, articles, etc */
const ViewTabs = () => {
	const [activeTab, setActiveTab] = React.useState(tabs[0])

	const handleViewChange = (e) => {
		setActiveTab(e.target.value)
	}

	const Component = components[tabs.indexOf(activeTab)]

	return (
		<div>
			<ViewSelector options={tabs} value={activeTab} onChange={handleViewChange} />
			<Component />
		</div>
	)
}
export default ViewTabs
