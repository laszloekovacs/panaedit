import React from 'react'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }

		this.state.error = null
		this.state.info = null
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		// Example "componentStack":
		//   in ComponentThatThrows (created by App)
		//   in ErrorBoundary (created by App)
		//   in div (created by App)
		//   in App
		this.state.error = error
		this.state.info = info

		console.log(error, info.componentStack)
	}

	render() {
		if (this.state.hasError && this.props.fallback) {
			// You can render any custom fallback UI
			return this.props.fallback
		}

		return this.props.children
	}
}

export default ErrorBoundary
