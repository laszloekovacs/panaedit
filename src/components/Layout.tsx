import React from 'react'

import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

import TabbedPanel from './TabbedPanel/TabbedPanel'
import Preview from './Preview/Preview'
import ScenesView from './ScenesView/ScenesView'

/* should render the header, sidebar, status bar and the tabs view */
const Layout = () => {
	const tabs = ['Scenes', 'Preview']
	const components = [ScenesView, Preview]

	return (
		<div className="bg-slate-50">
			<Header />
			<Sidebar />
			<TabbedPanel options={tabs} components={components} />
		</div>
	)
}

export default Layout
