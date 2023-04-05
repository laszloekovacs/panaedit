import React, { useEffect } from 'react'
import { useAsyncCall } from '../src/hooks/useAsyncCall'

const AsyncComponent = () => {
	const { data, error, isPending } = useAsyncCall(async () => {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/todos/1'
		)
		return response.json()
	})

	if (isPending) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error as string}</div>
	}

	if (data) {
		return <div>Data: {JSON.stringify(data)}</div>
	}

	return <div>Nothing</div>
}

export default AsyncComponent
