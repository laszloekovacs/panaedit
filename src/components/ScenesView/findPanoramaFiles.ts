export function findPanoramaFiles(
	filesMap: Map<string, string>,
	onFound: (items: string[]) => any
) {
	// filter our all keys that have panorama in them
	const keys = Array.from(filesMap.keys()).filter((key) =>
		key.includes('panorama')
	)

	// using the keys, get the urls from the map
	let urls = keys.map((key) => filesMap.get(key)) as string[]

	onFound(urls)
}
