## Vue常用的修饰符有哪些？应用场景怎么答

### 快速总览
- **表单修饰符**：`lazy` `number` `trim`
- **事件修饰符**：`.stop` `.prevent` `.self` `.once` `.capture`（可链式组合）
- **鼠标按键修饰符**：`.left` `.right` `.middle`
- **键盘修饰符**：`.enter` `.esc` `.space` `.delete` `.up/down` 等别名 + 系统键 `.ctrl` `.shift` `.alt` `.meta`
- **v-bind 修饰符**：`.sync` `.prop` `.camel`（Vue 3 中 `.sync` `.camel` 已废弃）

### 表单修饰符（配合 `v-model`）
- `lazy`：从 `input` 事件改为在 `change`（失焦或回车）时更新数据，减少频繁同步。
- `number`：尝试用 `parseFloat` 把输入转换为数字，失败时保留原值。`<input type="number">` 自动启用。
- `trim`：自动去除用户输入的首尾空格。

```vue
<input v-model.lazy.number.trim="age" />
```

-### 事件修饰符（绑定在事件后）
- `.stop`：等价 `event.stopPropagation()`，阻止冒泡。
- `.prevent`：等价 `event.preventDefault()`，阻止浏览器在事件触发后执行原本的默认动作，常见场景：
  - 表单提交按钮：阻止刷新页面或导航，改为通过 AJAX 提交。
  - `<a>` 标签点击：阻止跳转到 `href`，可改为单页内路由处理。
  - 输入框按键：阻止在受控组件里输入非法字符，配合校验逻辑。
  - 右键点击：阻止系统上下文菜单，改为展示自定义菜单。
  阻止后浏览器不会继续执行默认逻辑，但事件仍会冒泡，除非同时链 `.stop`。
- `.self`：只有事件源是当前元素自身时才触发；与其他修饰符的顺序会影响结果。
- `.once`：事件回调只执行一次。
- `.capture`：在捕获阶段触发，适合优先处理或阻塞后续冒泡。

```vue
<button @click.stop.prevent="submitForm">提交</button>
<div @click.self="close">点击遮罩关闭</div>
```

> `return false` 仅 DOM0 级事件可用，而且同时阻止默认行为和冒泡，面试时可顺带提一下差异。

### 鼠标按键修饰符
用于区分鼠标按钮，常见于自定义菜单或只允许左键操作。

```vue
<div @click.right.prevent="showContextMenu" />
```

### 键盘修饰符
- 使用别名如 `.enter` `.esc` `.delete` `.space` `.tab` `.up` `.down`。
- 系统组合键：`.ctrl` `.shift` `.alt` `.meta`，可组合使用。
- Vue 2 支持通过 `Vue.config.keyCodes.xxx = 13` 自定义别名。

```vue
<input @keyup.enter="search" @keydown.ctrl.c="copy" />
```

### v-bind 修饰符
- `.sync`：Vue 2 的双向绑定语法糖，内部等价于 `@update:prop` 事件。Vue 3 中改用 `defineModel` 或手动 `emit`。
- `.prop`：强制以 DOM property 形式绑定，例如 `value`、`checked` 等动态属性。
- `.camel`：把 `kebab-case` 转为 `camelCase`，常用于 SVG 属性（Vue 3 废弃）。

```vue
<child :visible.sync="dialogVisible" />
<svg-icon :view-box.camel="viewBox" :is-checked.prop="checked" />
```

### 面试回答模板
1. 先分类型列举核心修饰符，强调常用的 `lazy/number/trim`、`.stop/.prevent/.self/.once`。
2. 补充典型场景：表单同步、阻止默认行为、只有自身触发、按键区分。
3. 点出 Vue 2/3 差异：`v-model` 语法变化、`.sync` 被 `defineProps/defineEmits` 取代。
4. 若有时间，可提自定义键盘别名、修饰符链式使用等扩展点。

### `.prevent` 阻止非法字符输入实战

::: code-group

```vue [输入拦截展示]
<!-- 场景：只允许字母和数字，粘贴或输入非法字符时立即拦截 -->
<template>
  <form @submit.prevent="submit">
    <input
      v-model="nickname"
      placeholder="仅允许字母和数字"
      @input="sanitize($event.target.value)"
      @paste.prevent="handlePaste"  <!-- 阻止默认粘贴，改由自定义逻辑处理 -->
    />
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const ALLOW_PATTERN = /^[a-zA-Z0-9]*$/;
const nickname = ref('');
const error = ref('');

function sanitize(rawValue: string) {
  if (ALLOW_PATTERN.test(rawValue)) {
    nickname.value = rawValue;      // 输入合法，直接写入
    error.value = '';
  } else {
    nickname.value = rawValue.replace(/[^a-zA-Z0-9]/g, ''); // 清除非法字符
    error.value = '仅支持字母或数字，非法字符已移除';
  }
}

function handlePaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData('text') ?? '';
  sanitize(nickname.value + text); // 手动合并粘贴内容，复用同一校验逻辑
}

function submit() {
  if (!nickname.value) {
    error.value = '昵称不能为空';
    return;
  }
  // 业务提交逻辑...
}
</script>
```

:::