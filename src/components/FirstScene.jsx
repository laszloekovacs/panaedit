import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstSceneAction } from '../reducer/actions';

function FirstScene() {
	const dispatch = useDispatch();
	const store = useSelector((s) => s);
	let list = [];

	/* loop trough the scenes, sadly its not an array */
	for (let scene in store.scenes) {
		list.push(
			<option key={scene} value={scene}>
				{scene}
			</option>
		);
	}

	function setHandler(e) {
		const start = document.getElementById('startScene').value;

		dispatch(setFirstSceneAction(start.toString()));
	}

	const isSet =
		store.default.firstScene == 0
			? 'first scene not set'
			: `is set to: ${store.default.firstScene}`;

	if (list.length == 0) {
		return (
			<fieldset>
				<legend>first scene</legend>
				<p>{isSet}</p>
			</fieldset>
		);
	} else {
		return (
			<div>
				<h3>First scene</h3>
				<p>{isSet}</p>
				<select name="startScene" id="startScene">
					{list}
				</select>
				<button onClick={setHandler}>set</button>
			</div>
		);
	}
}

export default FirstScene;
