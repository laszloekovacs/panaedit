import React, { useEffect } from 'react'
import { useAsyncCall } from '../src/hooks/useAsyncCall'

const AsyncComponent = () => {
	const [data, pending, error] = useAsyncCall(() => {
		return 'data'
	})

	if (pending) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error as string}</div>
	}

	if (data) {
		return <div>Data: {data}</div>
	}

	return <div>Nothing</div>
}

export default AsyncComponent
