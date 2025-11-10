## Vue 2 vs Vue 3 Diff 算法速记（面试友好版）

> Diff 的任务：比较新旧虚拟 DOM 树，仅对有差异的节点执行最小数量的 DOM 操作，从而高效更新界面。

### Vue 2 的 Diff 思路
1. **同层比较**：只比较同层节点，避免跨层级。
2. **双端指针**：维护 `oldStart/oldEnd/newStart/newEnd` 四个指针，从前后同时向中间推进，快速跳过相同前缀/后缀。
3. **sameVnode 判断**：标签、key、data 等都相同时视为同一节点，可复用并继续递归 diff。
4. **乱序处理**：中段不匹配时，遍历旧节点列表，在新列表中查找相同 key；没有找到则创建新节点，找到则移动并更新。
5. **局限**：没有编译期静态标记，每次渲染都要完整遍历；乱序处理只用 Map 查找，没有 LIS，移动次数偏多。

### Vue 3 的 Diff 思路
1. 保留 **同层比较 + 双端指针** 核心框架。
2. **Patch Flag**：编译器提前标记动态节点/属性，渲染时只 diff 有标记的部分，静态节点直接跳过。
3. **静态提升**：完全静态的子树 hoist 到函数外，只创建一次，后续复用。
4. **乱序节点优化**：处理中间乱序时，先根据 key 构建 Map，再用 **最长递增子序列 (LIS)** 计算最少的移动次数。
5. 支持 **Fragment / Teleport / Suspense** 等多类型节点，渲染器做了对应扩展。

### 汇总对比
| 维度 | Vue 2 | Vue 3 |
| --- | --- | --- |
| 同层比较 | ✔ | ✔ |
| 双端指针 | ✔，四指针策略 | ✔，命名不同但策略一致 |
| key 复用 | `sameVnode` 复用节点 | 同样依赖 key；无 key 退化为按序 diff |
| 静态标记 | ✘，每次都遍历 | ✔，Patch Flag 跳过静态节点 |
| 静态提升 | ✘ | ✔，静态子树 hoist，减少创建 |
| 乱序优化 | 仅 Map 查找 | Map + LIS，减少 DOM 移动 |
| Fragment 支持 | ✘，需额外包裹 | ✔，原生支持多根节点 |

### 面试回答模板
1. **先讲共同点**：同层比较 + 双端指针 + key 复用。
2. **分别说明**：
   - Vue 2：描述四指针 + sameVnode + Map 查找乱序节点。
   - Vue 3：强调 Patch Flag、静态提升、LIS、Fragment。
3. **对比总结**：Vue 3 在编译期提供更多提示，让运行期 diff 范围更小、更智能，移动次数更少。
4. **实践补充**：提醒 key 的重要性、拆分组件的策略，或分享实际场景（例如列表渲染、异步组件）。

### 延伸参考
- [官方比较 Vue 2 vs Vue 3](https://v3.cn.vuejs.org/guide/migration/introduction.html)
- [Vue 3 Patch Flag 说明](https://v3.cn.vuejs.org/guide/migration/render-function-api.html#vnode-%E6%B7%BB%E5%8A%A0-patch-flag)
- [LIS 算法讲解](https://segmentfault.com/a/1190000044835898)
