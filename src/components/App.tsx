import React from 'react'
import { Provider } from 'react-redux'

import ErrorBoundary from './ErrorBoundary'
import FilesProvider from './FilesProvider'
import Layout from './Layout'

import { store } from '../store'

/* provide wrapper for error, store, and file selector */
function App() {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<FilesProvider>
					<Layout />
				</FilesProvider>
			</Provider>
		</ErrorBoundary>
	)
}

export default App
