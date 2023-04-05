declare global {
	interface Window {
		showDirectoryPicker: (
			options?: DirectoryPickerOptions
		) => Promise<FileSystemDirectoryHandle>
	}
}

export {}
