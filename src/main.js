import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Toasted,{
    duration:1500,
})

createApp(App).use(store).use(router).mount('#app')
