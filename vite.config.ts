import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // 点击插件图标出现的弹窗
        popup: resolve(__dirname, "src/popup/index.html"),
        // 插件的核心 JS，一直活跃在后台，来监听所有请求
        background: resolve(__dirname, "src/background.ts"),
        // 与页面同级，并在某个时机执行，可以拿到页面的 document
        picks: resolve(__dirname, "src/content.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    copy({
      targets: [
        { src: "src/manifest.json", dest: "dist" },
        // {
        //   src: "node_modules/@mozilla/readability/Readability.js",
        //   dest: "dist",
        // },
        {
          src: "Readability.js",
          dest: "dist",
        },
      ],
      hook: "writeBundle",
    }),
  ],
});
