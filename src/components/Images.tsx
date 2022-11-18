import React from 'react';

import Image from './Image';
import {useDispatch, useSelector} from 'react-redux';
import {
	deleteImageAction,
	addImagesAction,
	addImageLabelAction,
} from '../reducer/actions';

const fileOptions = {
	types: [{description: 'images', accept: {'image/jpeg': ['.jpeg', '.jpg']}}],
	multiple: true,
};

function Images({title}) {
	const dispatch = useDispatch();

	const article = useSelector((s) =>
		s.articles.find((a) => a.title == title)
	);

	function addImageLabelHandler(e, imageName, label) {
		e.preventDefault();
		dispatch(addImageLabelAction(title, imageName, label));
	}

	const galery = article?.images?.map((p, i) => (
		<li key={i} className="imageCard">
			<Image
				onAddLabel={addImageLabelHandler}
				onRemove={remove}
				src={p.src}
				index={i}
			></Image>
			<p className="minilabel">{p.src}</p>
			<p className="minilabel">{p.label}</p>
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
