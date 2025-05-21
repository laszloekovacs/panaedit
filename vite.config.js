import { defineConfig } from 'vite'

export default defineConfig({
	base: '/panedit/',
	build: {
		outDir: './dist'
	},
	test: {
		exclude: ['**/*.spec.tsx'],
		dir: 'test'
	}
})
