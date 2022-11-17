import React from 'react';
import {useSelector} from 'react-redux';
import Scene from './Scene';

function SceneList() {
	const setttings = useSelector((s) => s);
	const scenes = useSelector((s) => s.scenes);

	let list = [];

	for (let scene in scenes) {
		//if the scene is pinned, push it in front
		if (scene == setttings.pinned) {
			list.unshift(scenes[scene]);
		} else {
			list.push(scenes[scene]);
		}
	}

	const sceneList = list.map((s, k) => (
		<Scene key={k} index={k} title={s.title} />
	));

	if (list.length == 0) {
		return (
			<fieldset>
				<legend>scenes</legend>
				<p>no scenes loaded</p>
			</fieldset>
		);
	} else {
		return (
			<div className="scrollContainer">
				<fieldset>
					<legend>scenes</legend>
					<ul>{sceneList}</ul>
				</fieldset>
			</div>
		);
	}
}

export default SceneList;
