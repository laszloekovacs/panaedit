import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateArticleAction} from '../reducer/actions';

function ArticleEditor({title, onClose}) {
	const [_title, setTitle] = useState('');
	const [_text, setText] = useState('');

	const dispatch = useDispatch();
	const articles = useSelector((s) => s.articles);

	useEffect(() => {
		const article = articles.find((v) => v.title == title);
		if (article == undefined) console.error('cant find article');

		setTitle(article.title);
		setText(article?.text);
	}, []);

	function saveHandler(e) {
		e.preventDefault();

		dispatch(updateArticleAction(title, _title, _text));

		onClose();
	}

	return (
		<div>
			<form onSubmit={saveHandler}>
				<label htmlFor="title">title</label>
				<input
					type="text"
					name="title"
					id="title"
					required
					value={_title}
					onChange={(e) => setNewTitle(e.target.value)}
				/>
				<hr />
				<label htmlFor="text">article text</label>
				<br />
				<textarea
					name="text"
					id="text"
					cols="40"
					rows="4"
					value={_text}
					onChange={(e) => setText(e.target.value)}
				></textarea>
				<br />

				<hr />
				<input type="submit" value="save" />
			</form>
		</div>
	);
}

export default ArticleEditor;
