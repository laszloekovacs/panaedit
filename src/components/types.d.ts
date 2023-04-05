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
}

export {}
