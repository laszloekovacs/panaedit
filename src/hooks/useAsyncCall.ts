import { useEffect, useState } from 'react'

export function useAsyncCall(callback) {
	const [isPending, setPending] = useState(false)

	const [data, setData] = useState<unknown>(null)
	const [error, setError] = useState<unknown>(null)

	useEffect(() => {
		setData(null)
		setError(null)
		setPending(true)

		callback()
			.then(setData)
			.catch(setError)
			.finally(() => setPending(false))

		return () => {
			setData(null)
			setError(null)
			setPending(false)
		}
	}, [])

	return { isPending, data, error }
}
