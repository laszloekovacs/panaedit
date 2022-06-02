import React from 'react';
import {useSelector} from 'react-redux';

function AssetsPath() {
	const basepath = useSelector((s) => s.default.basePath);

	return (
		<div>
			<fieldset>
				<legend>asset base path</legend>
				<p>{basepath}</p>
			</fieldset>
		</div>
	);
}

export default AssetsPath;
