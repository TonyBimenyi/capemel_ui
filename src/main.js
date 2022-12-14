import { createApp } from 'vue'
import Toaster from "@meforma/vue-toaster";
import App from './App.vue'
import router from './router'
import store from './store'



createApp(App).use(Toaster).use(store).use(router).mount('#app')
