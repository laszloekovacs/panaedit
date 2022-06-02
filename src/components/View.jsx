import React from 'react';
import {useSelector} from 'react-redux';

function View() {
	const store = useSelector((s) => s);

	function ReloadHandler(e) {
		if (
			window.pannellum.view != undefined ||
			window.pannellum.view != null
		) {
			window.pannellum.view.destroy();
		}

		window.pannellum.viewer('view', store);
	}

	return (
		<fieldset>
			<legend>viewer</legend>
			<button onClick={ReloadHandler}>Reload</button>
			<hr />
			<br />
			<div id="view"></div>
		</fieldset>
	);
}

export default View;
