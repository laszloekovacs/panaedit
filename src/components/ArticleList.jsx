import React from 'react';
import { useSelector } from 'react-redux';
import Article from './Article';

function ArticleList() {
	const articles = useSelector((s) => s.articles);

	const list = articles.map((a, k) => (
		<Article key={k} title={a.title} text={a.text} />
	));

	/* no articles */
	if (articles.length == 0) {
		return (
			<div>
				<div>
					<h3>Articles</h3>
					<p>no articles loaded</p>
				</div>
			</div>
		);
	} else {
		/* we have atricles */
		return (
			<div className="scrollContainer">
				<div>
					<h3>Articles</h3>
					<ul>{list}</ul>
				</div>
			</div>
		);
	}
}

export default ArticleList;
