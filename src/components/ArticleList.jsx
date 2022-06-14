import React from 'react';
import {useSelector} from 'react-redux';
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
				<fieldset>
					<legend>Articles</legend>
					<p>no articles loaded</p>
				</fieldset>
			</div>
		);
	} else {
		/* we have atricles */
		return (
			<div className="scrollContainer">
				<fieldset>
					<legend>Articles</legend>
					<ul>{list}</ul>
				</fieldset>
			</div>
		);
	}
}

export default ArticleList;
