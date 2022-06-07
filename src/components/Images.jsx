import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {removeImageAction} from '../reducer/actions';

function Images({title}) {
	const dispatch = useDispatch();
	const imagepath = useSelector((s) => s.default.imagePath);

	const article = useSelector((s) =>
		s.articles.find((a) => a.title == title)
	);

	function remove(i) {
		dispatch(removeImageAction(title, i));
	}

	const galery = article.images.map((p, i) => (
		<li>
			<img key={i} src={imagepath + p}></img>
			<button onClick={(e) => remove(i)}>❌</button>
		</li>
	));

	return (
		<>
			<button>add image...</button>
			<ul>{galery}</ul>
		</>
	);
}

export default Images;
