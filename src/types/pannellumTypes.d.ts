export {}

/* extend window type */
declare global {
	interface Window {
		pannellum: Pannellum
	}
	interface Pannellum {
		viewer: (container: string, config: State) => PannellumViewer
	}

	type viewerEvent = 'error' | 'load' | 'scenechange' | 'animatefinished'

	interface PannellumViewer {
		on: (event: viewerEvent, listener: (data: any) => void) => void
		destroy: () => void
		getYaw: () => number
		getPitch: () => number
	}
}
