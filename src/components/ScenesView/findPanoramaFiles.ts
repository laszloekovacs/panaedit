export function findPanoramaFiles(filesMap: Map<string, string>): string[] {
	// filter our all keys that have panorama in them
	const keys = Array.from(filesMap.keys()).filter((key) =>
		key.includes('panorama')
	)

	// using the keys, get the urls from the map
	const urls = keys.map((key) => filesMap.get(key)) as string[]

	// return empty array if no urls found
	if (!urls) return []

	// return the urls
	return urls
}
