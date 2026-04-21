import {defineConfig, PluginOption} from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import vueDevTools from "vite-plugin-vue-devtools";
import path from "path";
import fs from 'fs';

const noBug:PluginOption = {
  name: "noBug-plugin",
  apply: "serve", // 仅在开发/服务模式下应用此插件
  configResolved(config) {
    if (config.command === "serve") {
      console.log(
        `
                             _ooOoo_
                            o8888888o
                            88" . "88
                            (| -_- |)
                             O\\ = /O
                         ____/\`---'\\____
                       .   ' \\\\| |// \`.
                        / \\\\||| : |||// \\
                      / _||||| -:- |||||- \\
                        | | \\\\\\ - /// | |
                      | \\_| ''\\---/'' | |
                       \\ .-\\__ \`-\` ___/-. /
                    ___\`. .' /--.--\\ \`. . __
                 ."" '< \`.___\\_<|>_/___.' >'"".
                | | : \`- \\\`.;\`\\ _ /\`;.\`/ - \` : | |
                  \\ \\ \`-. \\_ __\\ /__ _/ .-\` / /
          ======\`-.____\`-.___\\_____/___.-\`____.-'======
                             \`=---='
         
          .............................................
                   佛祖保佑             永无BUG
        `
      );
    }
  },
};

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`已删除的文件: ${filePath}`);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    // vueDevTools(),
    // noBug,
    {
      name: 'delete-auto-generated-files',
      buildStart() {
        if (process.env.NODE_ENV === 'development') {
          const typesDir = path.resolve(__dirname, 'src/types');
          deleteFile(path.join(typesDir, 'auto-imports.d.ts'));
          deleteFile(path.join(typesDir, 'components.d.ts'));
        }
      },
    },
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: [
        "vue",
        "vue-router",
        {
          "@vueuse/core": [
            "useDateFormat",
            "useNow",
            "useWindowSize"
            ]
        }
      ],
      // ignore:['/src/ktJS/**'],
      // 配置本地目录 自动引入
      // dirs: ['./src/utils/**', './src/stores/**'],
      // dirs: ['./src/**'],
      dirs: ['./src/views/**'],

      dts: path.resolve(
        path.resolve(__dirname, "src"),
        "types",// 指定自动导入函数TS类型声明文件路径
        "auto-imports.d.ts"
      ),
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: true,
    headers: {
      "Cache-Control": "no-store",
    },
    // 代理
    proxy: {
      "/api": {
        target: "http://122.9.132.234/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.type === "asset" &&
            /\.(jpe?g|png|gif|svg|webp)$/i.test(assetInfo.name)
          ) {
            return "static/img/[name].[hash][ext]";
          }
          if (
            assetInfo.type === "asset" &&
            /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)
          ) {
            return "static/fonts/[name].[hash][ext]";
          }
          return "static/[ext]/name1-[hash].[ext]";
        },
      },
    },
  },
});
