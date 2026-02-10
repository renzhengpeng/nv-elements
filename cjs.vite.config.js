/*
 * @Descripttion: 开发及构建打包配置
 * @creater: zhengpeng.ren
 * @since: 2024-05-14 10:43:37
 * @LastAuthor: zhengpeng.ren
 * @lastTime: 2024-06-11 16:43:48
 */
import { defineConfig } from 'vite';
import viteEslint from 'vite-plugin-eslint2';
import { resolve } from 'path';
import eslintConfig from './eslint.config';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  esbuild: {
    target: 'ES2015' // 需手动指定esbuild编译的目标版本，否则默认的编译输出版本无法正常在浏览器运行
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
    minify: false,
    outDir: 'lib',
    // 构建为库的配置
    lib: {
      // Could also be a dictionary or array of multiple entry points
      // entry: [resolve(__dirname, 'src/index.ts'), resolve(__dirname, 'src/components/nv-button/index.ts')],
      entry: resolve(__dirname, 'src/index.ts'),
      // 多入口配置，多入口时，formats不支持UMD格式
      // entry: {
      //   index: resolve(__dirname, 'src/index.ts'),
      //   button: resolve(__dirname, 'src/components/nv-button/index.ts')
      // },
      formats: ['cjs'],
      name: 'nv-elements', // 暴露的全局变量
      // 默认是package.json的name选项
      fileName(format, entryName) {
        const extension = '.cjs';
        return entryName + extension;
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
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        // 将提取的 CSS 输出到 styles 目录，与 es 构建保持一致
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'style';
          if (name.endsWith('.css')) {
            return 'styles/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    }
  }
}));
