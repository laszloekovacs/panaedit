import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {removeArticleAction} from '../reducer/actions';

import ArticleEditor from './ArticleEditor';

function Article({index, title, text}) {
	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);

	function removeHandler(e) {
		dispatch(removeArticleAction(title));
		console.log('removed');
	}

	function editHandler(e) {
		setEditing(true);
	}

	function saveHandler(e) {
		setEditing(false);
	}

	if (!editing) {
		return (
			<div>
				<h2>{title}</h2>
				<div>{text}</div>
				<button onClick={editHandler}>edit</button>
				<button onClick={removeHandler}>remove</button>
			</div>
		);
	} else {
		return (
			<ArticleEditor title={title} onClose={saveHandler}></ArticleEditor>
		);
	}
}

export default Article;
