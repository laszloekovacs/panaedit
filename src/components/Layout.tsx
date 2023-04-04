import React from 'react'

import Header from './header/Header'
import Tabs from './tabs/Tabs'
import Sidebar from './sidebar/Sidebar'

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
