import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateArticleAction} from '../reducer/actions';

function ArticleEditor({title, onClose}) {
	const [_title, setTitle] = useState('');

	const dispatch = useDispatch();
	const articles = useSelector((s) => s.articles);

	useEffect(() => {
		const article = articles.find((v) => v.title == title);
		if (article == undefined) console.error('cant find article');

		setTitle(article.title);
	}, []);

	function saveHandler(e) {
		e.preventDefault();

		dispatch(updateArticleAction(title, _title));

		onClose();
	}

	return (
		<div>
			<form onSubmit={saveHandler}>
				<input type="submit" value="save" />
				<label htmlFor="title">title</label>
				<input
					type="text"
					name="title"
					id="title"
					required
					value={_title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</form>
		</div>
	);
}

export default ArticleEditor;
