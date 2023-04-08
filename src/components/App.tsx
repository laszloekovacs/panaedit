import React from 'react'
import { Provider } from 'react-redux'

import ErrorBoundary from './ErrorBoundary'
import FilesProvider from './FilesProvider/FilesProvider'
import Layout from './Layout'

import { store } from '../store'

function App() {
	const directories = ['panoramas', 'articles', 'photos']

	return (
		<ErrorBoundary>
			<Provider store={store}>
				<FilesProvider directories={directories}>
					<Layout />
				</FilesProvider>
			</Provider>
		</ErrorBoundary>
	)
}

export default App
