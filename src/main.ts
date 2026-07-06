import { createApp } from 'vue'
import "./style.css";

import App from './App.vue'
import router from './router'

/**
 * Vue 앱 인스턴스를 생성합니다.
 */
const app = createApp(App)

/**
 * 앱 전체에서 Vue Router를 사용할 수 있도록 등록합니다.
 */
app.use(router)

/**
 * #app 요소에 Vue 앱을 마운트합니다.
 */
app.mount('#app')