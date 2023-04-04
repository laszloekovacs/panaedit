/* add article to project */
export function _addArticle(state: State, action: AddArticleAction): State {
	const { article } = action.payload

	state.articles.push(article)

	return state
}

/* remove an article from the project */
export function _removeArticle(state: State, action: RemoveArticleAction): State {
	const { articleId } = action.payload

	// find the article by id
	const index = state.articles.findIndex((article) => article.id == articleId)

	if (index == -1) {
		throw new Error('cannot delete, article does not exist')
	}

	const removed = state.articles.splice(index, 1)

	// TODO: remove all references to this article from the project

	return state
}
