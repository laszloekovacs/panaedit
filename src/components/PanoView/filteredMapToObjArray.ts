type R = { key: string; value: string }
type M = Map<string, string>

/* fiter by regex, return array */
export function filteredMapToObjArray(map: M, keyRegex: RegExp): R[] {
	let list: R[] = []

	map.forEach((value, key) => {
		if (keyRegex.test(key)) {
			list.push({ key, value })
		}
	})

	return list
}
