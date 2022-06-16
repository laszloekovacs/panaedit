import React from 'react';
import ArticleList from './ArticleList';
import FileMenu from './FileMenu';
import SceneList from './SceneList';
import View from './View';
import FirstScene from './FirstScene';
import AddPanorama from './AddPanorama';
import AddArticle from './AddArticle';
import SceneEdit from './SceneEdit';
import NSceneList from './NSceneList';


function App() {
	return (
		<div id="layout">
			<aside>
				<FileMenu></FileMenu>
				<hr />
				<FirstScene></FirstScene>
				<hr />
				<AddPanorama></AddPanorama>
				<hr />
				<NSceneList></NSceneList>
				<SceneEdit></SceneEdit>
				<hr />
				<SceneList></SceneList>
				<hr />
				<div>
					<AddArticle />
					<hr />
					<ArticleList />
					<hr />
				</div>
			</aside>

			<main>
				<View></View>
			</main>
		</div>
	);
}

export default App;
