import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import Unfonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        svgr(),
        Unfonts({
            google: {
                display: 'swap',
                injectTo: 'head-prepend',
                families: [
                    {
                        name: 'Roboto',
                        styles: 'ital,wght@0,400;0,700',
                        defer: true,
                    },
                ],
            },
        }),
    ],
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
