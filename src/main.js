import { createApp } from 'vue'
import Toaster from "@meforma/vue-toaster";
import App from './App.vue'
import router from './router'
import store from './store'



const app = createApp(App).use(Toaster).use(store).use(router)
app.mixin({
    computed: {
        url(){
          return this.$store.state.url
        },     
        headers(){
          return {
            headers:{
              "Authorization":"Bearer "+this.$store.state.user.access
            }
          }
        }
      },
      methods: {
        datetime(x) {
            if (!x) return "-"
            let date = new Date(x);
            return new Intl.DateTimeFormat(
              'en-US'
            ).format(date)
          },
        money(x) {
            x = parseInt(x).toFixed(0)
            if(!x) return "-";
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },
      },
  
})
app.mount('#app')
