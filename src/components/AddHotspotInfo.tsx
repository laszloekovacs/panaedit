import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addHotspotAction} from '../reducer/actions';

function AddHotspotInfo({title, type}) {
	const dispatch = useDispatch();

	const [yaw, setYaw] = useState(0);
	const [pitch, setPitch] = useState(0);
	const [info, setInfo] = useState('');

	function getOrientationHandler(e) {
		setYaw(window.panorama?.getYaw().toFixed(2) || 0);
		setPitch(window.panorama?.getPitch().toFixed(2) || 0);
	}

	function submitHandler(e) {
		e.preventDefault();

		let form = {
			title,
			pitch,
			yaw,
			type,
		};

		if (type == 'info') {
			form = {...form, text: info};
		} else {
			form = {...form, sceneId: info, text: info};
		}

		dispatch(addHotspotAction(form));
		setInfo('');
	}

	return (
		<div>
			<p>
				Add new <b>{type}</b>
			</p>
			<button onClick={getOrientationHandler}>get orientation</button>
			<p>
				y: <b>{yaw}</b> p: <b>{pitch}</b>
			</p>

			<form onSubmit={submitHandler}>
				<label htmlFor="infoHotspot">text</label>
				<input
					type="text"
					name="infoHotspot"
					value={info}
					onChange={(e) => setInfo(e.target.value)}
					required
				/>
				<input type="submit" value="add" />
			</form>
		</div>
	);
}

export default AddHotspotInfo;
