import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'

import App from './App.vue'

// create app 
const app  = createApp(App)
// vue-router
app.use(router)
// element组件
app.use(ElementPlus)
// 挂载
app.mount('#app')
