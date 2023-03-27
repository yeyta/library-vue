import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import service from './utils/request'
import App from './App.vue'


// create app 
const app  = createApp(App)
// vue-router
app.use(router)
// element组件
app.use(ElementPlus)
// axios
app.config.globalProperties.$axios = service;
// 挂载
app.mount('#app')
