import React, {useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
	setInitialRotationAction,
	setTitleAction,
	addHotspotAction,
} from '../reducer/actions';
import HotspotList from './HotspotList';

function SceneEdit() {
	const dispatch = useDispatch();
	const scenes = useSelector((s) => s.scenes);
	const editor = useSelector((s) => s.editor);

	const scene = scenes[editor?.currentScene];
	console.log(scene);

	function setDirectionHandler(e) {
		const yaw = window?.panorama?.getYaw();
		const pitch = window?.panorama?.getPitch();
		if (!yaw || !pitch) return;
		dispatch(
			setInitialRotationAction(
				editor.currentScene,
				yaw.toFixed(2),
				pitch.toFixed(2)
			)
		);
	}

	function setTitleHandler(e) {
		if (e.key != 'Enter') return;

		const titleInput = document.getElementById('title');
		if (titleInput.value == '') return;

		dispatch(setTitleAction(editor.currentScene, titleInput.value));
		titleInput.value = '';
	}

	function createSpot(spottype) {
		if (spottype == 'scene' || spottype == 'info') {
			/* fetch the textbox */
			const hotspotInput = document.getElementById('addspot');

			if (!hotspotInput.value) return;

			/* find the title of the linked scene */
			const text = scenes[hotspotInput.value]?.title;

			if (!text) return;

			let hotspot = {
				title: editor?.currentScene,
				pitch: parseFloat(window?.panorama.getPitch().toFixed(2)),
				yaw: parseFloat(window?.panorama.getYaw().toFixed(2)),
				type: spottype,
				text: text,
			};

			if (spottype == 'scene') {
				hotspot = {...hotspot, sceneId: hotspotInput.value.toString()};
			}

			dispatch(addHotspotAction(hotspot));
			hotspotInput.value = '';

			console.log(hotspot);
		} else {
			console.log('wrong hotspot type, should be scene or info');
		}
	}

	function addSceneHandler(e) {
		createSpot('scene');
	}

	function addInfoHandler(e) {
		createSpot('info');
	}

	return (
		<div>
			<hr />
			<h3>Edit Scene</h3>
			<hr />
			<h3>
				{editor?.currentScene} - {scene?.title}
			</h3>
			<div>
				<p>
					yaw: {scene?.yaw} pitch: {scene?.pitch}
				</p>
				<button onClick={setDirectionHandler}>set initial view</button>
			</div>
			<div>
				<input
					id="title"
					type="text"
					placeholder="rename title -> press enter"
					onKeyUp={setTitleHandler}
				/>
			</div>
			<div>
				<input
					type="text"
					id="addspot"
					name="addspot"
					placeholder="new hotspot"
				/>
				<button onClick={addSceneHandler}>add scene</button>
				<button onClick={addInfoHandler}>add info</button>
			</div>

			<HotspotList title={editor?.currentScene}></HotspotList>
		</div>
	);
}

export default SceneEdit;
