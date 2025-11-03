import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression"
export default defineConfig({
    server: {
        open: '/',
        port: 3000,
        hmr: true,
    },
    plugins: [react(),
    viteCompression({
        verbose: true,
        disable: false,
        deleteOriginFile: false,
        threshold: 1024,
        algorithm: "brotliCompress",
        ext: ".br",
    })
    ],
    build: {
        sourcemap: false, // disable source maps at production build
    },
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
        exclude: [
            // '@chakra-ui/react',
            '@chakra-ui/icons',
            // 如果還有其他相關套件，也一併加入
        ],
    },
})