import { defineConfig } from 'vite'

/* base needs to set to repo name for github pages to work */
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
