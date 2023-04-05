import React from 'react'

import Header from './Header/Header'
import Tabs from './Tabs/Tabs'
import Sidebar from './Sidebar/Sidebar'

/* should render the header, sidebar, status bar and the tabs view */
const Layout = () => {
	return (
		<div className="bg-slate-50">
			<Header />
			<Sidebar />
			<Tabs />
		</div>
	)
}

export default Layout
