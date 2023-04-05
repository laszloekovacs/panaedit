import React from 'react'

import Header from './Header/Header'
import ViewTabs from './ViewTabs/ViewTabs'
import Sidebar from './Sidebar/Sidebar'

/* should render the header, sidebar, status bar and the tabs view */
const Layout = () => {
	return (
		<div className="bg-slate-50">
			<Header />
			<Sidebar />
			<ViewTabs />
		</div>
	)
}

export default Layout
