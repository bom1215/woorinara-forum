import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import axios from './axios-config'; // 위에서 만든 axios 설정 파일


const app = createApp(App);

// Axios를 글로벌 인스턴스로 추가
app.config.globalProperties.$axios = axios;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(pinia).use(router).mount('#app')
// createApp(App)
//     .use(pinia)
//     .use(router)
//     .mount('#app')

