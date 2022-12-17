import { ConfigEnv, defineConfig } from "vite"

export default defineConfig({
    base: "./",
    root: "src",
    build: {
        outDir: "../docs",
        emptyOutDir: true,
    },
})
