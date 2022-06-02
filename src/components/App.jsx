import React from 'react';
import Articles from './Articles';
import AssetsPath from './AssetsPath';
import FileMenu from './FileMenu';
import SceneList from './SceneList';
import View from './View';
import FirstScene from './FirstScene';
import AddPanorama from './AddPanorama';
import AddAtricle from './AddAtricle';

function App() {
	return (
		<main>
			<div>
				<FileMenu></FileMenu>
				<AssetsPath></AssetsPath>
				<FirstScene></FirstScene>
				<hr />
				<div>
					<AddPanorama></AddPanorama>
					<SceneList></SceneList>
				</div>
				<hr />
				<div>
					<AddAtricle></AddAtricle>
					<Articles></Articles>
				</div>
			</div>
			<div>
				<View></View>
			</div>
		</main>
	);
}

export default App;
