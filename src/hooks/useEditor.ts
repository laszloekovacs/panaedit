import { useSelector } from 'react-redux'

export const useEditor = () => {
	const { editor, cache, scenes } = useSelector((state: State) => state)
	const activeView = editor.activeView
	const activeSceneKey = editor.activeSceneKey
	const scene = scenes[activeSceneKey]

	return { editor, cache, scenes, activeView, activeSceneKey, scene }
}
