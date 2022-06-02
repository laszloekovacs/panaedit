import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addArticleAction} from '../reducer/actions';

function AddAtricle() {
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
		<fieldset>
			<legend>add article</legend>
			<input
				type="text"
				name="title"
				value={articleName}
				onChange={changeHandler}
				placeholder="name of new article"
			/>
			<button onClick={addArticleHandler}>add article</button>
		</fieldset>
	);
}

export default AddAtricle;
