import data from '../../public/filemanifest.json'

/* 
    from a client side i don't think i can list directories
    should it load from a pre generated json?
*/

export async function loadOnlineAssets() {
	try {
		//		const response = await fetch(url)
		//		const data = await response.json()

		// format the data into chache lines
		const map: CacheLine[] = data.map((p) => {
			// @ts-ignore
			if (import.meta.env.MODE != 'development') {
				const path = '/panaedit/' + p
				return { key: path, value: path }
			}
			return { key: p, value: p }
		})

		return map
	} catch (error) {
		throw new Error(error as string)
	}
}
