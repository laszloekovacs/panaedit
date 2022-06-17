import React from 'react';
import ArticleList from './ArticleList';
import FileMenu from './FileMenu';

import FirstScene from './FirstScene';
import AddPanorama from './AddPanorama';
import AddArticle from './AddArticle';
import SceneEdit from './SceneEdit';
import NSceneList from './NSceneList';

function App() {
	return (
		<div id="sidebar">
			<FileMenu></FileMenu>
			<hr />
			<AddPanorama></AddPanorama>
			<hr />
			<FirstScene></FirstScene>
			<hr />
			<NSceneList></NSceneList>
			<SceneEdit></SceneEdit>

			<div>
				<AddArticle />
				<hr />
				<ArticleList />
				<hr />
			</div>
		</div>
	);
}

export default App;
