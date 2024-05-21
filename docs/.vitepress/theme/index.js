import DefaultTheme from 'vitepress/theme';
import './custom.css';
import RandomTopic from '../components/RandomTopic.vue'

export default {
  ...DefaultTheme,
  enhanceApp ({ app }) {
    app.component('RandomTopic', RandomTopic)
  }
};
