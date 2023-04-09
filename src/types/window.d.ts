declare global {
	interface Window {
		showDirectoryPicker: (
			options?: DirectoryPickerOptions
		) => Promise<FileSystemDirectoryHandle>

		showOpenFilePicker: (
			options?: FilePickerOptions
		) => Promise<FileSystemFileHandle[]>

		showSaveFilePicker: (
			options?: FilePickerOptions
		) => Promise<FileSystemFileHandle>
	}

	/* pannellum specific types */
	interface Window {
		pannellum: Pannellum
	}

	interface Pannellum {
		viewer: (container: string, config: State) => PannellumViewer
	}

	type viewerEvent = 'error' | 'load' | 'scenechange' | 'animatefinished'

	interface PannellumViewer {
		on: (event: viewerEvent, listener: (data: unknown) => void) => void
		destroy: () => void
		getYaw: () => number
		getPitch: () => number
	}
}

export {}
