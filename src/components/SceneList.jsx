import React from 'react';
import { useSelector } from 'react-redux';
import Scene from './Scene'


function SceneList() {
	const scenes = useSelector(s => s.scenes);

	let list = [];

	for (const scene in scenes) {
		list.push(scenes[scene])
	}

	const sceneList = list.map((s, k) => (<Scene key={k} index={k} title={s.title} />))

	if (list.length == 0) {
		return (
			<fieldset>
				<legend>scenes</legend>
				<p>no scenes loaded</p>
			</fieldset>
		);
	} else {
		return (
			<fieldset>
				<legend>scenes</legend>
				<ul>
					{sceneList}
				</ul>
			</fieldset>
		)
	}
}

export default SceneList;
