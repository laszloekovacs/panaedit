import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addArticleAction } from '../reducer/actions';

function AddArticle() {
	const [articleName, setArticleName] = useState('');

	const dispatch = useDispatch();

	function addArticleHandler(e) {
		e.preventDefault();

		dispatch(addArticleAction(articleName));

		setArticleName('');

		console.log('article added');
	}

	function changeHandler(e) {
		setArticleName(e.target.value);
	}

	return (
		<div>
			<h3>Add article</h3>
			<form onSubmit={addArticleHandler}>
				<input
					type="text"
					name="title"
					value={articleName}
					onChange={changeHandler}
					placeholder="name of new article"
					required
				/>
				<input type="submit" value="add" />
			</form>
		</div>
	);
}

export default AddArticle;
