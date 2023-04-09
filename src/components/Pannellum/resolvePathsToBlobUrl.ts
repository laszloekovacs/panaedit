type fn = (path: string, cache: CacheLine[]) => string

/* the file path is the key, the value is the blob url */
export const resolvePathsToBlobUrl: fn = (path, cache) => {
	const url = cache.find((line) => line.key == path)?.value

	console.log(path, url)
	if (!url) {
		throw new Error(`Path ${path} is not associated with a blob url.`)
	}

	return url
}
