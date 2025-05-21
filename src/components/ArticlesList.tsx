import React from 'react'
import { filterCache } from '../functions'
import { useEditor } from '../hooks/useEditor'
import { useAsyncCall } from '../hooks/useAsyncCall'
import ArticlesListItem from './ArticlesListItem'

const ArticlesList = () => {
	const { cache } = useEditor()

	const [articles, loading] = useAsyncCall(() => {
		return filterCache(cache, /articles/)
	})

	if (loading) return <div>loading...</div>

	if (!articles)
		return (
			<div>
				<p>No articles found</p>
			</div>
		)

	return (
		<ul className="grid h-full grid-cols-2 gap-1 overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
			{articles &&
				articles.map((article) => (
					<ArticlesListItem key={article.key} article={article} />
				))}
		</ul>
	)
}

export default ArticlesList
