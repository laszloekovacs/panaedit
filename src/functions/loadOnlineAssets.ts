/* 
    from a client side i don't think i can list directories
    should it load from a pre generated json?
*/

export async function loadOnlineAssets(fetch, url) {
	try {
		const response = await fetch(url)
		const data = await response.json()

		// format the data into chache lines
		const map: CacheLine[] = data.map((p) => {
			return { key: p, value: p }
		})

		return map
	} catch (error) {
		throw new Error(error as string)
	}
}
