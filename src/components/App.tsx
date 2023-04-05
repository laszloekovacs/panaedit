import React from 'react'
import { Provider } from 'react-redux'

import ErrorBoundary from './ErrorBoundary'
import FoldersProvider from './FoldersProvider/FoldersProvider'
import Layout from './Layout'

import { store } from '../store'

function App() {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<FoldersProvider>
					<Layout />
				</FoldersProvider>
			</Provider>
		</ErrorBoundary>
	)
}

export default App
