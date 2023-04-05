import React from 'react'
import { Provider } from 'react-redux'

import ErrorBoundary from './ErrorBoundary'
import FoldersProvider from './FoldersProvider/FoldersProvider'
import Layout from './Layout'

import { store } from '../store'

function App() {
	const directories = ['panoramas', 'articles', 'photos']

	return (
		<ErrorBoundary>
			<Provider store={store}>
				<FoldersProvider directories={directories}>
					<Layout />
				</FoldersProvider>
			</Provider>
		</ErrorBoundary>
	)
}

export default App
