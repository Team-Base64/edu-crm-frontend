import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
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
            localsConvention: 'dashes',
        },
    },
});
