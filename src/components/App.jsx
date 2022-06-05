import React from 'react';
import ArticleList from './ArticleList';
import FileMenu from './FileMenu';
import SceneList from './SceneList';
import View from './View';
import FirstScene from './FirstScene';
import AddPanorama from './AddPanorama';
import AddAtricle from './AddAtricle';

function App() {
	return (
		<>
			<div id="layout">
				<aside>
					<FileMenu></FileMenu>
					<FirstScene></FirstScene>
					<hr />
					<AddPanorama></AddPanorama>
					<SceneList></SceneList>
					<hr />
					<div>
						<AddAtricle></AddAtricle>
						<ArticleList></ArticleList>
					</div>
				</aside>

				<main>
					<View></View>
				</main>
			</div>
		</>
	);
}

export default App;
