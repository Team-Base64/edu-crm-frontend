import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {browserslistToTargets} from "lightningcss";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 8001,
        strictPort: true,
    },
    build: {
        manifest: true,
        cssMinify: 'esbuild',
    },
    css: {
        devSourcemap: true,
        transformer: 'postcss',
        modules: {
            localsConvention: 'dashes'
        }
    },
})
