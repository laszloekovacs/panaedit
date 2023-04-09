import { useSelector } from 'react-redux'

export const useEditor = () => {
	const { editor, cache, scenes } = useSelector((state: State) => state)
	const activeView: string = editor.activeView
	const activeSceneKey: string = editor.activeSceneKey
	const scene: Scene = scenes[activeSceneKey]

	return { editor, cache, scenes, activeView, activeSceneKey, scene }
}
