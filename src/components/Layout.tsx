import React from 'react'

import Header from './Header/Header'
import TabSelector from './TabSelector'
import PanoView from './PanoView/PanoView'
import Preview from './Preview/Preview'

const options = [
	{ label: 'Panoramas', value: <PanoView /> },
	{ label: 'Preview', value: <Preview /> }
]

/* should render the header, sidebar, status bar and the tabs selector 
	the tabs decide what to render in main, and sidebar 
*/
const Layout = () => {
	const [selected, setSelected] = React.useState(options[0])

	const handleChange = (to) => {
		setSelected(to)
	}

	return (
		<div className="h-screen">
			<Header />
			<TabSelector
				options={options}
				selected={selected}
				onChange={handleChange}
			/>
			{selected.label == 'Panoramas' && <PanoView />}
			{selected.label == 'Preview' && <Preview />}
		</div>
	)
}

export default Layout
