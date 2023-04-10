import { useSelector } from 'react-redux'

export const useEditor = () => {
	const state: State = useSelector((state: State) => state)
	const { editor, cache, scenes } = state
	const activeView: string = editor.activeView
	const activeSceneKey: string = editor.activeSceneKey
	const scene: Scene = scenes[activeSceneKey]

	return { state, editor, cache, scenes, activeView, activeSceneKey, scene }
}
