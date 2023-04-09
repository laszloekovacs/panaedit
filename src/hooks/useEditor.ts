import { useSelector } from 'react-redux'

export const useEditor = () => {
	const { editor, cache, scenes } = useSelector((state: State) => state)
	const activeView = editor.activeView
	const activeScene = editor.activeScene
	const sceneKey = scenes[activeScene]

	return { editor, cache, scenes, activeView, activeScene, sceneKey }
}
