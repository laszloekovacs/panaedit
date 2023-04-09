/* fiter by regex, return array */
export function filteredCache(cache: CacheLine[], regex): CacheLine[] {
	let list: CacheLine[] = []

	list = cache.filter((line) => {
		return line.key.match(regex)
	})

	return list
}
