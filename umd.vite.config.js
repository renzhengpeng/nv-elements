/*
 * @Descripttion: 开发及构建打包配置
 * @creater: zhengpeng.ren
 * @since: 2024-05-14 10:43:37
 * @LastAuthor: zhengpeng.ren
 * @lastTime: 2024-06-11 16:44:19
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
    }),
    // 动态注入样式插件：在 UMD 构建时将全局样式注入入口文件，避免手动修改源码
    {
      name: 'inject-global-styles',
      transform(code, id) {
        if (id.replace(/\\/g, '/').endsWith('src/index.ts')) {
          return {
            code: `import './styles/variables/index.scss';\nimport './styles/global/global.style.scss';\n${ code }`,
            map: null
          };
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    // 构建为库的配置
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['umd'],
      name: 'nv-elements', // 暴露的全局变量
      fileName(format, entryName) {
        const extension = '.js';
        return entryName + extension;
      }
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          // vue: 'Vue'
        }
      }
    }
  }
}));
