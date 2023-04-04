export {}

declare global {
	interface Window {
		pannellum: Pannellum
	}

	interface Pannellum {
		viewer: (container: string, config: State) => PannellumViewer
	}

	type viewerEvent = 'error' | 'load' | 'scenechange'

	interface PannellumViewer {
		on: (event: viewerEvent, callback: (data: any) => void) => void
		destroy: () => void
		getYaw: () => number
		getPitch: () => number
	}
}
