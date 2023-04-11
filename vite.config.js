import { defineConfig } from 'vite'

export default defineConfig({
	base: '/panaedit/',
	build: {
		outDir: './dist'
	},
	test: {
		exclude: ['**/*.spec.tsx'],
		dir: 'test'
	}
})
