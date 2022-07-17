import React from 'react';
import { useSelector } from 'react-redux';
import Article from './Article';

function ArticleList() {
	const articles = useSelector((s) => s.articles);

	const list = articles.map((a, k) => (
		<Article key={k} title={a.title} text={a.text} />
	));

	return (
		<div className={articles.length && "scrollContainer"}>
			<h3>Articles</h3>
			{articles.length === 0 ? <p>no articles loaded</p> : list}
		</div>
	)
}

export default ArticleList;
