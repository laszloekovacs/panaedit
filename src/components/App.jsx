import React, {useEffect} from 'react';
import ArticleList from './ArticleList';
import FileMenu from './FileMenu';
import SceneList from './SceneList';
import FirstScene from './FirstScene';
import AddPanorama from './AddPanorama';
import AddArticle from './AddArticle';
import SceneEdit from './SceneEdit';
import NSceneList from './NSceneList';
import {setSceneAction} from '../reducer/actions';
import {useDispatch, useSelector} from 'react-redux';

function App() {
	const dispatch = useDispatch();
	const scenes = useSelector((s) => s.scenes);

	/* store current scene in store */
	useEffect(() => {
		function sceneChange() {
			let scene = '';

			if (window?.panorama == undefined) return;

			scene = window?.panorama?.getScene();
			console.log(scene);

			dispatch(setSceneAction(scene));
		}

		window?.panorama?.on('load', sceneChange);
	});

	return (
		<div id="layout">
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
		</div>
	);
}

export default App;
