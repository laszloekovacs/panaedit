import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function View() {
	const store = useSelector((s) => s);


	function resetHandler(e) {
		window.panorama?.destroy();

		window.panorama = window.pannellum.viewer('out', store)
	}


	return (
		<fieldset>
			<legend>pannellum viewer</legend>
			<button onClick={resetHandler}>Reset</button>
			<hr />
			<br />
			<div id="out"></div>
		</fieldset>
	);
}

export default View;
