import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {removeArticleAction} from '../reducer/actions';

import ArticleEditor from './ArticleEditor';
import Images from './Images';

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
				<button onClick={removeHandler}>remove article</button>
				<div>{text}</div>
				<Images title={title} />
				<button onClick={editHandler}>edit</button>
			</div>
		);
	} else {
		return (
			<div>
				<ArticleEditor
					title={title}
					onClose={saveHandler}
				></ArticleEditor>
			</div>
		);
	}
}

export default Article;
