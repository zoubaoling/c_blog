## 与 Webpack 类似的构建工具对比

> 常见对比：Webpack、Vite、Rollup、Parcel、Snowpack。回答时注意突出“场景 + 优势/劣势”。

### 一句话定位
- **Webpack**：功能最全的“通用型打包器”，生态成熟，适合大型复杂项目。
- **Vite**：新一代开发服务器 + 打包器，依赖原生 ES Modules，开发体验极佳。
- **Rollup**：专注于 ES Modules 打包的小而精工具，常用于库/框架打包。
- **Parcel**：零配置上手、自动化程度高，更少的配置细节。
- **Snowpack**：早期基于 ESM 的开发服务器（现已合并进 Astro 生态），理念与 Vite 类似。

### 快速对照表
| 工具 | 主要特征 | 适用场景 | 劣势/注意点 |
| --- | --- | --- | --- |
| Webpack | Loader/Plugin 生态完善，功能覆盖全面（HMR、Tree Shaking、代码分割、按需加载） | 中大型应用、定制化需求重的项目 | 配置复杂、冷启动慢 |
| Vite | Dev 阶段基于原生 ESM，冷启动超快，HMR 即时；生产默认用 Rollup 打包 | 现代框架项目（Vue、React、Svelte），追求开发效率 | 部分高级 Bundling 场景仍需手动配置 Rollup 插件；生态尚在成长 |
| Rollup | 输出体积小、Tree-shaking 更彻底、无多余运行时代码 | JS/TS 库、组件库打包（Vue、React 官方包都是 Rollup） | 对 CommonJS 支持弱，需要插件；缺少 HMR、复杂应用配置较麻烦 |
| Parcel | 开箱即用、零配置、内置常用优化 | 小型项目、快速原型 | 可定制性不足、生态相对较小 |
| Snowpack | 利用浏览器 ESM，即时构建；现已转向 Astro | 理念上与 Vite 相似 | 项目已停止维护，不再推荐新项目使用 |

### Webpack vs Vite 常见追问
- **开发构建速度**：Vite 利用原生 ESM，按需编译；Webpack 需要先打包。
- **配置复杂度**：Vite 约等于 Rollup 配置；Webpack 需理解 Loader/Plugin 细节。
- **生态与成熟度**：Webpack 更成熟，插件多，适配各种场景；Vite 发展迅速，但部分周边仍在完善。
- **生产打包**：Vite 生产阶段也是使用 Rollup 输出，需要额外配置 Rollup 插件处理特殊资源。

### 面试答题建议
1. **先分类型**：区分通用打包器（Webpack）、开发服务器（Vite/Snowpack）、库打包器（Rollup）。
2. **强调场景**：示例说明何时更适合使用 Vite（现代框架开发）、Rollup（组件库发布）。
3. **补充对比点**：编译速度、配置复杂度、生态成熟度、生产打包能力。
4. **结合经验**：可以提及团队从 Webpack 迁移到 Vite 的收益/坑点，或发布组件库用 Rollup 的实践。

牢记这些差异，就能在面试中迅速回答“除了 Webpack，你了解哪些构建工具？为什么选它们？”。
