import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import PannellumView from '../PannellumView/PannellumView'

const Preview = () => {
	return (
		<div className="flex min-h-max flex-row">
			<Sidebar />
			<PannellumView />
		</div>
	)
}

export default Preview
