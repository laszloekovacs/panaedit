import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function Image({onAddLabel, onRemove, src, index}) {
	const [label, setLabel] = useState('');

	const imagepath = useSelector((s) => s.default.imagePath);
	return (
		<>
			<img src={imagepath + src}></img>

			<input
				type="text"
				placeholder="label"
				value={label}
				onChange={(e) => setLabel(e.target.value)}
			/>
			<button
				onClick={(e) => {
					if (label.length == 0) return;
					onAddLabel(e, src, label);
					setLabel('');
				}}
			>
				set label
			</button>

			<button onClick={(e) => onRemove(index)}>delete img</button>
		</>
	);
}

export default Image;
