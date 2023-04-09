import { useSelector } from 'react-redux'

export const useEditor = () => {
	const editor = useSelector((state: State) => state.editor)

	return editor
}
