<script setup>
import { computed, markRaw, onBeforeUnmount, reactive, watch } from 'vue'

const RAW_GLOB = import.meta.glob('../../../src/**/*.md', {
  as: 'raw',
  eager: true
})
const MODULE_GLOB = import.meta.glob('../../../src/**/*.md', {
  import: 'default',
  eager: true
})

const EXCLUDE_PATTERNS = [/\/index\.md$/, /README\.md$/i]
const CATEGORY_SEGMENTS = ['html', 'js', 'vue', 'webpack']

const createQuestionPool = () => {
  return Object.entries(RAW_GLOB)
    .filter(([path]) => {
      if (EXCLUDE_PATTERNS.some((pattern) => pattern.test(path))) return false
      return CATEGORY_SEGMENTS.some((segment) => path.includes(`/${segment}/`))
    })
    .map(([path, raw]) => {
      const cleaned = raw
        .replace(/^---[\s\S]*?---/, '')
        .replace(/\r\n/g, '\n')
        .trim()

      const headingMatch = cleaned.match(/^#{1,6}\s*(.+)$/m)
      const fileName = path.split('/').pop()?.replace(/\.md$/, '') ?? '未命名题目'

      const title = headingMatch?.[1]?.trim() || fileName
      const category = path.split('/').find((segment) =>
        CATEGORY_SEGMENTS.includes(segment.toLowerCase())
      )

      return {
        id: path,
        title,
        category: category ? category.toUpperCase() : 'OTHER',
        component: MODULE_GLOB[path]
      }
    })
    .filter((item) => item.component)
}

const state = reactive({
  mode: 'timer',
  timerOptions: [
    { label: '30 分钟', value: 1800 },
    { label: '60 分钟', value: 3600 },
    { label: '120 分钟', value: 7200 }
  ],
  selectedDuration: 3600,
  timeLeft: 3600,
  timerId: null,
  sessionActive: false,
  timerExpired: false,
  questionPool: createQuestionPool(),
  remainingPool: [],
  currentQuestion: null,
  currentAnswerComponent: null,
  showAnswer: false
})

const isPoolEmpty = computed(() => state.questionPool.length === 0)

const formattedTime = computed(() => {
  if (state.mode !== 'timer') return '--:--'
  const hours = Math.floor(state.timeLeft / 3600)
  const minutes = Math.floor((state.timeLeft % 3600) / 60)
  const seconds = state.timeLeft % 60
  const segments = [
    hours > 0 ? String(hours).padStart(2, '0') : null,
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0')
  ].filter(Boolean)

  return segments.join(':')
})

const resetRemainingPool = () => {
  state.remainingPool = [...state.questionPool]
}

const stopTimer = () => {
  if (state.timerId) {
    clearInterval(state.timerId)
    state.timerId = null
  }
}

const expireTimer = () => {
  stopTimer()
  state.timeLeft = 0
  state.timerExpired = true
  state.sessionActive = false
}

const startTimer = () => {
  stopTimer()
  state.timeLeft = state.selectedDuration
  state.timerExpired = false
  state.timerId = setInterval(() => {
    if (state.timeLeft <= 1) {
      expireTimer()
      return
    }
    state.timeLeft -= 1
  }, 1000)
}

const ensureSession = () => {
  if (state.mode === 'timer') {
    if (state.timerExpired) return false
    if (!state.sessionActive) {
      state.sessionActive = true
      startTimer()
    }
  }
  return true
}

const loadAnswer = (question) => {
  if (!question?.component) return
  state.currentAnswerComponent = markRaw(question.component)
}

const drawQuestion = () => {
  if (!ensureSession()) return

  if (!state.questionPool.length) return
  if (!state.remainingPool.length) {
    resetRemainingPool()
  }

  const randomIndex = Math.floor(Math.random() * state.remainingPool.length)
  const [question] = state.remainingPool.splice(randomIndex, 1)

  state.currentQuestion = question
  state.showAnswer = false
  state.currentAnswerComponent = null
  loadAnswer(question)
}

const revealAnswer = () => {
  state.showAnswer = true
}

const resetSession = () => {
  stopTimer()
  state.sessionActive = false
  state.timerExpired = false
  state.timeLeft = state.mode === 'timer' ? state.selectedDuration : 0
  state.currentQuestion = null
  state.currentAnswerComponent = null
  state.showAnswer = false
}

const handleModeChange = () => {
  resetSession()
}

watch(
  () => state.mode,
  () => {
    handleModeChange()
  }
)

watch(
  () => state.selectedDuration,
  (value) => {
    if (state.mode === 'timer') {
      state.timeLeft = value
      if (state.sessionActive) {
        startTimer()
      }
    }
  }
)

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <section class="review-wrapper">
    <header class="review-header">
      <div class="header-left">
        <h1>每日随机复习</h1>
        <p>从 HTML / JavaScript / Vue / 构建工具池中随机抽题，巩固印象。</p>
      </div>
      <div class="header-right" v-if="state.mode === 'timer'">
        <span class="timer-label">剩余时间</span>
        <span class="timer-value" :class="{ danger: state.timeLeft <= 60 }">
          {{ formattedTime }}
        </span>
      </div>
    </header>

    <div class="mode-switch">
      <label class="mode-option">
        <input
          v-model="state.mode"
          type="radio"
          name="mode"
          value="timer"
        />
        <span>定时模式</span>
      </label>
      <label class="mode-option">
        <input
          v-model="state.mode"
          type="radio"
          name="mode"
          value="free"
        />
        <span>不定时模式</span>
      </label>
    </div>

    <transition name="fade">
      <div v-if="state.mode === 'timer'" class="timer-controls">
        <label class="timer-option" v-for="option in state.timerOptions" :key="option.value">
          <input
            v-model.number="state.selectedDuration"
            type="radio"
            name="duration"
            :value="option.value"
          />
          <span>{{ option.label }}</span>
        </label>
      </div>
    </transition>

    <div v-if="state.timerExpired" class="timer-expired">
      <p>定时时间已到，休息一下吧！如需继续，可重新开始复习。</p>
      <button type="button" class="btn primary" @click="resetSession">
        重新开始
      </button>
    </div>

    <div class="actions">
      <div v-if="isPoolEmpty" class="empty-pool">
        暂未找到可抽取的题目，请检查 HTML、JavaScript、Vue、构建工具目录下的 Markdown 文件。
      </div>
      <button
        type="button"
        class="btn primary"
        :disabled="state.timerExpired || isPoolEmpty"
        @click="drawQuestion"
      >
        {{ state.currentQuestion ? '再抽一题' : '开始抽题' }}
      </button>
      <button
        v-if="state.sessionActive || state.currentQuestion"
        type="button"
        class="btn"
        @click="resetSession"
      >
        清空当前
      </button>
    </div>

    <article v-if="state.currentQuestion" class="question-card">
      <header class="question-header">
        <span class="badge">{{ state.currentQuestion.category }}</span>
        <h2>{{ state.currentQuestion.title }}</h2>
      </header>

      <div class="question-body">
        <p class="hint">思考完毕后再揭晓答案。</p>
        <button
          v-if="!state.showAnswer"
          type="button"
          class="btn outline"
          @click="revealAnswer"
        >
          查看答案
        </button>

        <transition name="fade">
          <div v-if="state.showAnswer" class="answer-wrapper">
            <component
              v-if="state.currentAnswerComponent"
              :is="state.currentAnswerComponent"
            />
            <p v-else class="loading">正在加载答案...</p>
          </div>
        </transition>
      </div>
    </article>

    <p v-else class="empty-tip">
      点击「开始抽题」即可进入今日复习。
    </p>
  </section>
</template>
.empty-pool {
  flex: 1 1 100%;
  color: var(--vp-c-text-2);
}


<style scoped>
.review-wrapper {
  padding: 1.5rem;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
}

.review-header {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.header-left h1 {
  margin: 0 0 0.35rem;
  font-size: 1.5rem;
}

.header-left p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.header-right {
  text-align: right;
  min-width: 140px;
}

.timer-label {
  display: block;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.timer-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.timer-value.danger {
  color: var(--vp-c-red-2);
}

.mode-switch {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mode-option {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  cursor: pointer;
}

.mode-option input {
  accent-color: var(--vp-c-brand-1);
}

.timer-controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.timer-option {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  border: 1px solid transparent;
}

.timer-option input {
  accent-color: var(--vp-c-brand-1);
}

.timer-expired {
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-red-2);
  background: rgba(255, 82, 82, 0.12);
  color: var(--vp-c-red-2);
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.52rem 1.1rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.12);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.btn.primary {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: transparent;
}

.btn.outline {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: transparent;
}

.question-card {
  border-radius: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
}

.question-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.question-header h2 {
  margin: 0;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--vp-c-brand-3);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 0.85rem;
}

.question-body .hint {
  color: var(--vp-c-text-2);
  margin: 0 0 0.75rem;
}

.answer-wrapper {
  margin-top: 1.25rem;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 1rem;
}

.answer-wrapper :deep(h2),
.answer-wrapper :deep(h3),
.answer-wrapper :deep(h4) {
  margin-top: 1.25rem;
}

.answer-wrapper :deep(pre) {
  max-height: 400px;
  overflow: auto;
}

.loading {
  color: var(--vp-c-text-2);
}

.empty-tip {
  text-align: center;
  color: var(--vp-c-text-2);
  margin: 1.5rem 0 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .review-wrapper {
    padding: 1rem;
  }

  .review-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-right {
    text-align: left;
  }
}
</style>

