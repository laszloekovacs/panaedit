import { useEffect, useState } from 'react'

/* wraps a long running function into a promise, and returns variables to monitor its progress */

export function usePromise<T>(callback: () => T) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<unknown>(null)
	const [result, setResult] = useState<T | null>(null)

	useEffect(() => {
		const promise = new Promise<T>((resolve, reject) => {
			resolve(callback())
		})
	}, [callback])

	return { loading, error, result }
}
