<script setup>
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useRoute } from 'vitepress'

const isClient = typeof window !== 'undefined'
const speechSupported = ref(false)
const speaking = ref(false)
const paused = ref(false)
const loadingVoices = ref(true)
const voices = ref([])
const selectedVoiceURI = ref('')
const rate = ref(1)
const utteranceRef = shallowRef(null)

const route = useRoute()

const hasDocContent = computed(() => {
  if (!isClient) return false
  const text = document.querySelector('.vp-doc')?.innerText?.trim()
  return Boolean(text && text.length > 0)
})

const resolveVoices = () => {
  if (!speechSupported.value) return
  const synth = window.speechSynthesis
  const available = synth.getVoices()
  if (!available.length) return

  voices.value = available

  if (!selectedVoiceURI.value) {
    const chineseVoice = available.find((voice) => voice.lang.startsWith('zh'))
    selectedVoiceURI.value = chineseVoice?.voiceURI || available[0].voiceURI
  }

  loadingVoices.value = false
}

const stop = () => {
  if (!speechSupported.value) return
  const synth = window.speechSynthesis
  synth.cancel()
  speaking.value = false
  paused.value = false
  utteranceRef.value = null
}

const speak = () => {
  if (!speechSupported.value) return
  const target = document.querySelector('.vp-doc')
  const text = target?.innerText?.trim()
  if (!text) return

  stop()

  const utterance = new SpeechSynthesisUtterance(text)
  const voice = voices.value.find((item) => item.voiceURI === selectedVoiceURI.value)
  if (voice) utterance.voice = voice
  utterance.rate = rate.value
  utterance.onend = () => {
    speaking.value = false
    paused.value = false
    utteranceRef.value = null
  }
  utterance.onerror = () => {
    speaking.value = false
    paused.value = false
    utteranceRef.value = null
  }

  utteranceRef.value = utterance
  window.speechSynthesis.speak(utterance)
  speaking.value = true
  paused.value = false
}

const pause = () => {
  if (!speechSupported.value) return
  const synth = window.speechSynthesis
  if (synth.speaking && !synth.paused) {
    synth.pause()
    paused.value = true
  }
}

const resume = () => {
  if (!speechSupported.value) return
  const synth = window.speechSynthesis
  if (synth.speaking && synth.paused) {
    synth.resume()
    paused.value = false
  }
}

onMounted(() => {
  if (!isClient || !('speechSynthesis' in window)) return

  speechSupported.value = true

  resolveVoices()
  const synth = window.speechSynthesis
  synth.onvoiceschanged = resolveVoices
})

onBeforeUnmount(() => {
  stop()
  if (!speechSupported.value) return
  const synth = window.speechSynthesis
  if (synth.onvoiceschanged === resolveVoices) {
    synth.onvoiceschanged = null
  }
})

watch(
  () => route.path,
  () => {
    stop()
    resolveVoices()
  }
)
</script>

<template>
  <section class="tts-card" aria-label="文本朗读控制">
    <h3 class="tts-title">语音朗读</h3>
    <p v-if="!speechSupported" class="tts-tip">
      当前浏览器不支持语音朗读。建议使用最新的 Chrome、Edge 或 Safari。
    </p>
    <template v-else>
      <p v-if="!hasDocContent" class="tts-tip">当前页面没有可朗读的内容。</p>
      <div v-else class="tts-controls">
        <label class="tts-field">
          <span>声音</span>
          <select v-model="selectedVoiceURI" :disabled="loadingVoices">
            <option value="" disabled>正在加载可用声音...</option>
            <option
              v-for="voice in voices"
              :key="voice.voiceURI"
              :value="voice.voiceURI"
            >
              {{ voice.name }}（{{ voice.lang }}）
            </option>
          </select>
        </label>

        <label class="tts-field">
          <span>语速</span>
          <input
            v-model.number="rate"
            type="range"
            min="0.8"
            max="1.4"
            step="0.05"
          />
          <span class="tts-rate">{{ rate.toFixed(2) }}x</span>
        </label>

        <div class="tts-buttons">
          <button
            type="button"
            class="tts-button primary"
            :disabled="!hasDocContent"
            @click="speak"
          >
            {{ speaking ? '重新播放' : '开始播放' }}
          </button>
          <button
            type="button"
            class="tts-button"
            :disabled="!speaking || paused"
            @click="pause"
          >
            暂停
          </button>
          <button
            type="button"
            class="tts-button"
            :disabled="!speaking || !paused"
            @click="resume"
          >
            继续
          </button>
          <button
            type="button"
            class="tts-button danger"
            :disabled="!speaking"
            @click="stop"
          >
            停止
          </button>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.tts-card {
  margin: 1.5rem 0 2rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
}

.tts-title {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.tts-tip {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.tts-controls {
  display: grid;
  gap: 1rem;
}

.tts-field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  flex-wrap: wrap;
}

.tts-field span:first-child {
  min-width: 2.5rem;
  color: var(--vp-c-text-2);
}

.tts-field select {
  min-width: 220px;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.tts-field input[type='range'] {
  flex: 1;
  min-width: 160px;
}

.tts-rate {
  min-width: 3rem;
  text-align: right;
  color: var(--vp-c-text-2);
}

.tts-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tts-button {
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid transparent;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tts-button.primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.tts-button.danger {
  background: var(--vp-c-red-2);
  color: white;
}

.tts-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.tts-button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.18);
}
</style>

