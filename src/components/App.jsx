import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ArticleList from './ArticleList';
import FileMenu from './FileMenu';
import SceneList from './SceneList';
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
			<hr />
			<SceneList></SceneList>
			<hr />
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
