type T = Map<string, string>

export function filterMapByKeyRegex(regex: string, filesMap: T): T {
	let result = new Map<string, string>()

	filesMap.forEach((value, key) => {
		if (key.match(regex)) {
			result.set(key, value)
		}
	})

	return result
}
