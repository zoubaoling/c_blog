<template>
  <ClientOnly>
    <div class="playground-container">
      <transition name="playground-slide">
        <div v-if="visible" class="playground-panel" :style="{ width: panelWidth + 'px' }">
          <header class="playground-header">
            <div>
              <strong>Vue 3 Playground</strong>
              <span class="playground-subtitle">随读随写 · 实时预览</span>
            </div>
            <div class="playground-actions">
              <button class="playground-btn" type="button" @click="reset">
                重置
              </button>
              <button class="playground-btn" type="button" @click="toggleVisible">
                关闭
              </button>
            </div>
          </header>

          <div class="playground-resizer" @mousedown.prevent="startResize"></div>

          <Repl
            class="playground-repl"
            :store="store"
            :theme="replTheme"
            :ssr="false"
            :clear-console="false"
          />
        </div>
      </transition>

      <button
        class="playground-toggle"
        type="button"
        :aria-expanded="visible"
        @click="toggleVisible"
      >
        <span v-if="!visible">🧪 Vue Playground</span>
        <span v-else>📖 继续阅读</span>
      </button>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ClientOnly } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'

const DEFAULT_APP = `<script setup lang="ts">
import { ref } from 'vue'

const greeting = ref('Hello Vue 3 👋')
const count = ref(1)

function increment() {
  count.value++
}
</script>

<template>
  <section class="demo-card">
    <h2>{{ greeting }}</h2>
    <p>当前计数：{{ count }}</p>
    <button @click="increment">+1</button>
  </section>
</template>

<style scoped>
.demo-card {
  display: grid;
  gap: 12px;
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #e8f3ff, #f5fcff);
  color: #1f2d3d;
  text-align: center;
  box-shadow: 0 6px 18px rgba(31, 45, 61, 0.08);
}

.demo-card button {
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  background: #3f8cff;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease-in-out;
}

.demo-card button:hover {
  transform: translateY(-1px);
}
</style>
`

const DEFAULT_MAIN = `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`

const store = new ReplStore({
  serializedState: '',
  defaultVueRuntimeURL: 'https://unpkg.com/vue@3/dist/vue.runtime.esm-browser.js',
  defaultVueServerRendererURL: 'https://unpkg.com/vue@3/dist/vue.server-renderer.esm-browser.js'
})

function initStore() {
  store.setFiles(
    {
      'App.vue': DEFAULT_APP,
      'main.ts': DEFAULT_MAIN
    },
    'App.vue'
  )
}

initStore()

const visible = ref(false)
const panelWidth = ref(520)
const replTheme = computed(() => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))

let isResizing = false
let startX = 0
let startWidth = panelWidth.value

function toggleVisible() {
  visible.value = !visible.value
}

function reset() {
  initStore()
}

function startResize(event) {
  isResizing = true
  startX = event.clientX
  startWidth = panelWidth.value
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
}

function handleResize(event) {
  if (!isResizing) return
  const delta = startX - event.clientX
  panelWidth.value = Math.min(Math.max(startWidth + delta, 360), 860)
}

function stopResize() {
  isResizing = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}

onMounted(() => {
  // 按下 ESC 快速关闭面板
  const handleKey = (event) => {
    if (event.key === 'Escape') {
      visible.value = false
    }
  }

  window.addEventListener('keydown', handleKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', handleKey))
})

onBeforeUnmount(() => {
  stopResize()
})
</script>

<style scoped>
.playground-container {
  position: fixed;
  inset: auto 0 24px auto;
  z-index: 40;
  pointer-events: none;
}

.playground-toggle {
  pointer-events: auto;
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #5c7aff, #00c2ff);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 16px 30px rgba(55, 126, 255, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-right: 24px;
}

.playground-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(55, 126, 255, 0.28);
}

.playground-panel {
  pointer-events: auto;
  position: fixed;
  inset: 60px 0 60px 0;
  margin-left: auto;
  margin-right: 12px;
  max-width: calc(100vw - 120px);
  min-width: 360px;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  background: var(--vp-c-bg, #ffffff);
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.22);
  overflow: hidden;
}

.playground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--vp-c-divider, rgba(15, 23, 42, 0.08));
  background: var(--vp-c-bg-soft, #f4f8ff);
}

.playground-subtitle {
  display: block;
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.playground-actions {
  display: flex;
  gap: 8px;
}

.playground-btn {
  border: none;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.playground-btn:hover {
  transform: translateY(-1px);
  background: var(--vp-button-alt-hover-bg);
}

.playground-resizer {
  position: absolute;
  left: -8px;
  top: 32px;
  bottom: 32px;
  width: 12px;
  cursor: ew-resize;
  z-index: 2;
}

.playground-repl {
  flex: 1;
  min-height: 0;
}

.playground-slide-enter-active,
.playground-slide-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.playground-slide-enter-from,
.playground-slide-leave-to {
  transform: translateX(16px);
  opacity: 0;
}

@media (max-width: 960px) {
  .playground-panel {
    inset: 60px 0 0 0;
    margin: 0;
    border-radius: 0;
    width: 100vw !important;
  }

  .playground-toggle {
    margin-right: 16px;
  }
}
</style>

