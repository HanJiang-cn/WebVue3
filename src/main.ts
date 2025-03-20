import './assets/main.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/router/guard'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as Icons from '@ant-design/icons-vue'

import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: any = Icons
for (const i in icons) {
  app.component(i, icons[i])
}

// 日历
app.use(setupCalendar, {})
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

// 编辑器
import { InstallCodeMirror } from 'codemirror-editor-vue3'
app.use(InstallCodeMirror)

// 评论
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'

app.use(UndrawUi)

// 二维码
import VueQrcode from 'vue-qrcode'
app.component('VueQrcode', VueQrcode)
