import { defineConfig } from 'vite'

export default defineConfig({
	base: './',
	build: {
		outDir: 'docs'
	},
	test: {
		exclude: ['**/*.spec.ts']
	}
})
