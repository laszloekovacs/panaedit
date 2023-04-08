type fn = (path: string, refMap: Map<string, string>) => string

/* the file path is the key, the value is the blob url */
export const resolvePathsToBlobUrl: fn = (path, refMap) => {
	const url = refMap.get(path)

	if (!url) {
		throw new Error(`Path ${path} is not associated with a blob url.`)
	}

	return url
}
