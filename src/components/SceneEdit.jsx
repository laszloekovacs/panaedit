import React, {useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

function SceneEdit({scene}) {
	const scenes = useSelector((s) => s.scenes);
	const editor = useSelector((s) => s.editor);
	const dispatch = useDispatch();

	const [_title, setTitle] = useState('');
	const [_yaw, setYaw] = useState(0);
	const [_hotspot, setHotspot] = useState('');

	return (
		<div>
			<hr />
			<h3>Edit Scene</h3>
			<hr />
			<h3>name of scene - title</h3>
			<div>
				<input
					type="text"
					placeholder="title"
					value={_title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button>set</button>
			</div>
			<div>
				<input
					type="text"
					placeholder="yaw"
					value={_yaw}
					onChange={(e) => setYaw(e.target.value)}
				/>
				<button>set initial yaw</button>
			</div>
			<div>
				<input
					type="text"
					name="addnew"
					placeholder="new hotspot"
					value={_hotspot}
					onChange={(e) => setHotspot(e.target.value)}
				/>
				<button>add scene</button>
				<button>add info</button>
			</div>
			<h4>hotspots</h4>
		</div>
	);
}

export default SceneEdit;
