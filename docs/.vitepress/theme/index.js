import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import RandomTopic from '../components/RandomTopic.vue'
import RandomReview from './components/RandomReview.vue'
import TextToSpeech from './components/TextToSpeech.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(TextToSpeech)
    })
  },
  enhanceApp({ app }) {
    app.component('RandomTopic', RandomTopic)
    app.component('RandomReview', RandomReview)
  }
}
