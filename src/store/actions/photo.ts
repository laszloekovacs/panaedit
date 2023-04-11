/* add photo to article */
export function _addPhoto(
	state: State,
	action: {
		payload: {
			articleId: string
			photoUrl: string
		}
	}
) {
	const { articleId, photoUrl } = action.payload

	// find the article by id
	const article = state.articles.find((article) => article.id == articleId)

	if (!article) {
		throw new Error('cannot add photo, article does not exist')
	}

	const photo = { url: photoUrl, label: '' }

	// add the photo
	article.photos.push(photo)

	return state
}

/* remove photo from article */
export function _removePhoto(
	state: State,
	action: {
		payload: {
			articleId: string
			url: string
		}
	}
) {
	const { articleId, url } = action.payload

	// find the article by id
	const article = state.articles.find((article) => article.id == articleId)

	if (!article) {
		throw new Error('cannot remove photo, article does not exist')
	}

	// remove the photo
	article.photos = article.photos.filter((photo) => photo.url != url)

	return state
}

/* set photo labe */
export function _setPhotoLabel(
	state: State,
	action: {
		payload: {
			articleId: string
			url: string
			label: string
		}
	}
) {
	const { articleId, url, label } = action.payload

	// find the article by id
	const article = state.articles.find((article) => article.id == articleId)

	if (!article) {
		throw new Error('cannot set photo label, article does not exist')
	}

	// find the photo by url
	const photo = article.photos.find((photo) => photo.url == url)

	if (!photo) {
		throw new Error('cannot set photo label, photo does not exist')
	}

	// set the label
	photo.label = label

	return state
}
