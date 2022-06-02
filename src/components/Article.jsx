import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {removeArticleAction} from '../reducer/actions';

function Article({index, title}) {
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
				<button onClick={removeHandler}>remove</button>
				<button onClick={editHandler}>edit</button>
			</div>
		);
	} else {
		return (
			<div>
				<label htmlFor="title">title</label>
				<input type="text" name="title" id="title" />
				<hr />
				<label htmlFor="text">article text</label>
				<textarea name="text" id="text" cols="30" rows="4"></textarea>
				<br />
				<button onClick={saveHandler}>save</button>
			</div>
		);
	}
}

export default Article;
