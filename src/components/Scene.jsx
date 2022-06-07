import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AddHotspot from './AddHotspot';
import HotspotList from './HotspotList';
import {setInitialRotationAction} from '../reducer/actions';

function Scene({index, title}) {
	const settings = useSelector((s) => s);
	const scenes = useSelector((s) => s.scenes);
	const dispatch = useDispatch();

	function pinHandler(e) {
		dispatch({type: 'SET_PINNED', payload: title});
	}

	function unpinHandler(e) {
		dispatch({type: 'RESET_PINNED'});
	}

	const pin =
		settings.pinned != title ? (
			<button onClick={pinHandler}>📌</button>
		) : (
			<button onClick={unpinHandler}>❌</button>
		);

	function setOrientationHandler(e) {
		const yaw = window?.panorama?.getYaw();
		const pitch = window?.panorama?.getPitch();

		if (!yaw || !pitch) return;
		console.log('click');
		setInitialRotationAction(title, yaw, pitch);
	}

	return (
		<li key={index}>
			<fieldset>
				{pin}
				<h3>{title}</h3>
				<button onClick={setOrientationHandler}>set as initial</button>
				<AddHotspot title={title}></AddHotspot>
				<HotspotList title={title}></HotspotList>
			</fieldset>
		</li>
	);
}

export default Scene;
