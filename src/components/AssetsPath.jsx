import React from 'react';
import {useSelector} from 'react-redux';

function AssetsPath() {
	const defaults = useSelector((s) => s.default);

	return (
		<div>
			<fieldset>
				<legend>asset base path</legend>
				<p>{defaults.basePath}</p>
				<p>{defaults.imagePath}</p>
			</fieldset>
		</div>
	);
}

export default AssetsPath;
