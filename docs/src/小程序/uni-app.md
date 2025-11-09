## uni-app开发微信小程序
> 前情：使用cli工具创建vue3+ts模版

1. 默认支持TS、SASS、LESS等
2. 运行`npm run dev:mp-weixin`后，打开开发者工具导入`dist`目录下对应成果物
3. cursor和VSCode中编辑，运行dev命令后，用微信开发者工具导入，可以调试

### 接入pinia
::: warning
pinia3.x与uni-app的兼容性有问题，最好使用pinia2.x
```bash
pnpm remove pinia
pnpm install pinia@2.1.7
```
```js
import { createPinia } from 'pinia'
app.use(createPinia())

import { defineStore } from 'pinia'
const useUserInfoStore = defineStore('userInfo', (
  retur {}
})
```
:::

### 样式
1. 默认支持scss和less
2. 入口样式文件是uni.scss

如果要使用less, 可以建立styles目录存放less文件，再vite.config.ts中配置
```js
export defineConfig({
  css: {
    preprocessorOptions: { // 预处理器配置
      less: { // less相关配置
        additionalData: `@import "@style/index.less"` // 在每个less文件编译时自动注入配置的这段代码
      }
    }
  }
})
```
上面配置中的additionalData等价于
```vue
<style lang="less" scoped>
// 自动注入下面这行配置的代码
@import "@style/index.less"; 
</style>
```

### usingComponents配置
> usingComponents主要配置的是第三方组件，自定义组件可以直接import使用

在package.json中配置
```json
{
  "globalStyle": {
    "usingComponents": {}
  },
  "pages": [
    {
      "path": "",
      "style": {
        "usingComponents": {}
      }
    }
  ]
}
```

### 开启sourcemap
```js
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    minify: process.env.NODE_ENV === 'production' // 开发时关闭压缩，便于调试
  },
  // 微信小程序特殊配置
  define: {
    __VUE_PROD_DEVTOOLS__: process.env.NODE_ENV === 'development'
  }
})
```

### 使用第三方组件问题——TDesign
现象：src/pages.json中配置usingComponents时，会报错无法找到对应的TDesign组件
原因：uni-app 的构建产物找不到 tdesign-miniprogram 的路径
  - tdesign-miniprogram 是 微信原生小程序组件库，需要通过 npm 构建到 miniprogram_npm 下才能被识别。
  - 而 uni-app 的构建工具（vite/webpack）不会自动把这个库拷贝到 dist/dev/mp-weixin/miniprogram_npm，导致运行时报错
  - 其他类似的小程序组件(.wxml .wxss)等都需要构建到miniprogram_npm中才能使用，但是uni-app不会自动构建，需要额外处理
方案：
1. pages.json中配置引入
```json
// pages.json
	"globalStyle": {
		"navigationStyle": "custom",
		"usingComponents": {
			"t-button": "/miniprogram_npm/tdesign-miniprogram/button/button",
			"t-swipe-cell": "/miniprogram_npm/tdesign-miniprogram/swipe-cell/swipe-cell"
		}
	}
```
2. 编写脚本，在dist/dev/mp-weixin下创建package.json,下载node_modules，再手动构建npm，就会生成miniprogram_npm
```js
#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// -----------------------------
// 配置
// -----------------------------
const WX_CLI_PATH = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli';
const DIST_DIRS = [path.resolve('dist/dev/mp-weixin')];
const DEPENDENCIES = ['tdesign-miniprogram'];

// -----------------------------
// 主逻辑
// -----------------------------
DIST_DIRS.forEach(distDir => {
  if (!existsSync(distDir)) {
    console.warn(`⚠️ dist 目录不存在，跳过: ${distDir}`);
    return;
  }

  console.log(`📦 处理 ${distDir} ...`);

  // 1️⃣ package.json
  const packageJsonPath = path.join(distDir, 'package.json');
  if (!existsSync(packageJsonPath)) {
    const pkg = {
      name: 'mp-weixin-dist',
      version: '1.0.0',
      description: 'dist 自动生成的 package.json',
      dependencies: {},
    };
    DEPENDENCIES.forEach(dep => {
      pkg.dependencies[dep] = '*'; // 保证能安装最新版本
    });
    writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log('✅ 已生成 package.json');
  }

  // 2️⃣ 安装依赖
  console.log('📥 安装依赖...');
  execSync('npm install', { cwd: distDir, stdio: 'inherit' });

  // 3️⃣ project.config.json
  const projectConfigPath = path.join(distDir, 'project.config.json');
  let config = {};
  if (existsSync(projectConfigPath)) {
    config = JSON.parse(readFileSync(projectConfigPath, 'utf8'));
  }
  config.miniprogramRoot = './';
  config.packNpmManually = true;
  config.packNpmRelationList = [
    {
      packageJsonPath: './package.json',
      miniprogramNpmDistDir: './miniprogram_npm',
    },
  ];
  writeFileSync(projectConfigPath, JSON.stringify(config, null, 2), 'utf8');
  console.log('✅ 已更新 project.config.json');

  // 4️⃣ 微信 CLI 构建 npm
  if (!existsSync(WX_CLI_PATH)) {
    console.warn(`⚠️ 未找到微信 CLI: ${WX_CLI_PATH}`);
    console.log('请手动构建 npm');
  } else {
    console.log('🚀 调用微信 CLI 构建 npm...');
    try {
      execSync(`"${WX_CLI_PATH}" --project "${distDir}" --packNpm`, { stdio: 'inherit' });
    } catch (e) {
      console.error('❌ 自动构建 npm 失败，请手动在微信开发者工具执行构建');
    }
  }

  console.log(`🎉 ${distDir} 处理完成`);
});

console.log('✅ 所有目录已处理完成！');
```
3. 执行`npm run dev:mp-weixin`，编译到dist/dev/mp-weixin中
4. 执行`node scripts/postbuild-mp-weixin.js`, 在dist/dev/mp-weixin中下载TDesign依赖
5. 手动构建npm
6. 重新编译

> 注意重新执行dev, 重启开发者工具，提示找不到文件后，再构建npm, 最后清除缓存重新编译运行

:::tip
其他组件注意事项
1. props只传递原始数据/纯JS对象
2. 函数和对象props无法直接传递
3. 如果有函数事件，可以使用slot+事件绑定实现
:::

### TDesign-t-swipe-cell
结论：uniapp中t-swipe-cell不能使用`right="rightActions"`的方法，而应该使用slot插槽的方式实现
原因：
1. 小程序底层组件（包括 TDesign 的 t-swipe-cell）在接收 right prop 时，UniApp 会尝试把对象序列化成 JSON 传给小程序。
2. 如果对象里包含 reactive 响应式对象、函数、闭包或者循环引用（如 Vue 的 reactive item），就会触发 Converting circular structure to JSON 报错


### 图片使用
> uni-app中静态资源的引用有特定的规则
1. 使用 import 导入
   ```js
      import leftIcon from '@/static/images/back.png'
      const imgSrc = ref(leftIcon)
   ```
2. 使用 require 动态导入
   ```js
      // 动态导入
      const getImageSRc = (imageName: string) => {
        return require(`@/static/images/${imageName}.png`)
      }
      const backImg = ref(require('@/static/images/back.png'))
   ```
3. 使用/static/绝对路径
   ```js
      const leftIcon = ref('/static/images/back.png')
   ```
4. 使用相对路径
   ```vue
      <template>
        <!-- 相对路径 -->
        <image src="./images/logo.png" />
        <image src="../static/images/logo.png" />
      </template>
   ```

### @别名
> cli创建的uni-app+ts项目默认设置了@别名,指向src目录
1. vite.config.ts的配置，但是uni-app中，`@dcloudio/vite-plugin-uni`插件默认处理了@,所以不需要配置
  - 负责构建时的路径解析，vite根据配置找到文件,影响运行时的模块加载，会报错Module not found
  ```ts
  // vite.config.ts
  export default defineConfig({
    resolve({
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    })
  })
  ```
2. tsconfig.json
   - 负责开发时的TS类型检查，IDE智能提示，不影响运行时，只影响开发体验，类型检查会报错Cannot find module 'xxx'
  ```json
  {
    "compilerOptions": {
    "paths": { // 路径映射
      "@/*": ["./src/*"]
    }
  }
  }
  ```