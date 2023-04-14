import data from '../../public/filemanifest.json'

/* 
    from a client side i don't think i can list directories
    should it load from a pre generated json?
*/

export async function loadOnlineAssets() {
	try {
		//		const response = await fetch(url)
		//		const data = await response.json()
		// @ts-ignore
		if (import.meta.env.MODE == 'development') {
			console.log('dev mode')
		}

		// format the data into chache lines
		const map: CacheLine[] = data.map((p) => {
			// @ts-ignore
			if (import.meta.env.MODE == 'development') {
				return { key: p, value: p }
			} else {
				const path = '/panaedit/' + p
				return { key: path, value: path }
			}
		})

		return map
	} catch (error) {
		throw new Error(error as string)
	}
}
