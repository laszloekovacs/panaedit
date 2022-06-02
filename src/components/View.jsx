import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

function View() {
	const store = useSelector((s) => s);

	useEffect(() => {
		window.pannellum.view = window.pannellum.viewer('view', store);

		return () => {
			window.pannellum.view.destroy();
		};
	});

	return (
		<fieldset>
			<legend>viewer</legend>
			<hr />
			<br />
			<div id="view"></div>
		</fieldset>
	);
}

export default View;
