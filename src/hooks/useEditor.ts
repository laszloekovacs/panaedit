import { useSelector } from 'react-redux'

declare type UseEditor = () => {
	state: State
	editor: Editor
	cache: CacheLine[]
	scenes: { [key: string]: Scene }
	activeView: string
	activeSceneKey: string
	scene: Scene
}

export const useEditor: UseEditor = () => {
	const state = useSelector<State, State>((state: State) => state)
	const { editor, cache, scenes } = state
	const activeView: string = editor.activeView
	const activeSceneKey: string = editor.activeSceneKey
	const scene: Scene = scenes[activeSceneKey]

	return { state, editor, cache, scenes, activeView, activeSceneKey, scene }
}
