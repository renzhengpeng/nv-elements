/*
 * @Descripttion: 开发及构建打包配置
 * @creater: zhengpeng.ren
 * @since: 2024-05-14 10:43:37
 * @LastAuthor: zhengpeng.ren
 * @lastTime: 2024-06-11 16:37:11
 */
import { defineConfig } from 'vite';
import viteEslint from 'vite-plugin-eslint2';
import { resolve } from 'path';
import eslintConfig from './eslint.config';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  esbuild: {
    target: 'ES2015', // 需手动指定esbuild编译的目标版本，否则默认的编译输出版本无法正常在浏览器运行
    exclude: ['node_modules/**']
  },
  plugins: [
    viteEslint({
      include: ['*.config.js', 'src/**/*'],
      lintDirtyOnly: false,
      overrideConfig: eslintConfig // 使用项目中的eslint配置
    }),
    // vite本身只负责将ts转换成js，并不进行类型检查，以提高编译的速度。所以可能会出现在开发时编译正常，但打包时报错的问题
    // 使用vite-plugin-checker来开启开发时的类型检查，但这样会降低编译过程的速度
    checker({
      typescript: true
    })
  ],
  build: {
    assetsInlineLimit: 0,
    minify: false,
    // 构建为库的配置
    outDir: 'es',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: 'nv-elements',
      fileName(format, entryName) {
        return entryName + '.mjs';
      }
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        /^lit/,
        /^@lit-labs/,
        'prismjs',
        'prettier'
      ],
      output: {
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        // 非插件生成的 CSS 仍放到 styles；插件已按源码目录生成对应 CSS
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'style';
          if (name.endsWith('.css')) {
            return 'styles/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
        globals: {

        },
        esModule: true
      }
    }
  }
}));
