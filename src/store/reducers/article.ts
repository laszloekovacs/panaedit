/* add article to project */
export function _addArticle(state: State, action: AddArticleAction): State {
	const { article } = action.payload

	state.articles.push(article)

	return state
}
