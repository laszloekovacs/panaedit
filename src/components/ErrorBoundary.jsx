import React from 'react'
import ErrorPage from './ErrorPage'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			hasError: false,
			error: { message: '', stack: '' },
			info: { componentStack: '' }
		}
	}

	static getDerivedStateFromError = (error) => {
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		this.setState({ error, info })
		console.log(error.stack, info.componentStack)
	}

	render() {
		const { hasError, error, info } = this.state
		const { children } = this.props

		return hasError ? <ErrorPage message={error.message} /> : children
	}
}

export default ErrorBoundary
