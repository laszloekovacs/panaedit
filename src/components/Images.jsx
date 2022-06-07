import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {deleteImageAction, addImagesAction} from '../reducer/actions';

const fileOptions = {
	types: [{description: 'images', accept: {'image/jpeg': ['.jpeg', '.jpg']}}],
	multiple: true,
};

function Images({title}) {
	const dispatch = useDispatch();
	const imagepath = useSelector((s) => s.default.imagePath);

	const article = useSelector((s) =>
		s.articles.find((a) => a.title == title)
	);

	const galery = article?.images?.map((p, i) => (
		<li key={i}>
			<img src={imagepath + p}></img>
			<button onClick={(e) => remove(i)}>❌</button>
		</li>
	));

	function remove(i) {
		dispatch(deleteImageAction(title, i));
	}

	async function addImageHandler(e) {
		const filehandle = await window.showOpenFilePicker(fileOptions);

		const files = filehandle.map((f) => f.name);

		dispatch(addImagesAction(title, files));
	}

	return (
		<>
			<button onClick={addImageHandler}>add image...</button>
			<ul>{galery}</ul>
		</>
	);
}

export default Images;
