import React from 'react';
import {useDispatch} from 'react-redux';
import {addSceneAciton} from '../reducer/actions';

function AddPanorama() {
	const dispatch = useDispatch();

	function addSceneHandler(e) {
		const files = document.getElementById('files').files;

		if (files.length == 0) return;

		console.log(files);
		for (const file of files) {
			/* extract filename */
			console.log(file.name);
			dispatch(addSceneAciton(file.name));
		}
	}

	return (
		<fieldset>
			<legend>add panorama</legend>
			<input type="file" name="" id="files" multiple />
			<button onClick={addSceneHandler}>add</button>
		</fieldset>
	);
}

export default AddPanorama;
