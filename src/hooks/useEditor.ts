import { useSelector } from 'react-redux'

export const useEditor = () => {
	const editor = useSelector((state: State) => state.editor)
	const cache = useSelector((state: State) => state.cache)
	const activeView = editor.activeView

	return { editor, cache, activeView }
}
