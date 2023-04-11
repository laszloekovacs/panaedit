import { useEffect, useState } from 'react'

/* wraps a long running function into a promise, and returns variables to monitor its progress */

export function usePromise<T>(callback: () => T) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<unknown>(null)
	const [result, setResult] = useState<T | null>(null)

	useEffect(() => {
		const run = async () => {
			setLoading(true)
			try {
				const res = callback()
				setResult(res)
			} catch (e) {
				setError(e)
			} finally {
				setLoading(false)
			}
		}

		run()
	}, [callback])

	return [result, loading, error ] as const
}
