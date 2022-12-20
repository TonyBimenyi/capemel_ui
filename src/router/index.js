import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Districts from '../views/District.vue'

const routes = [
  {path: '/',name:'dashboard',component: Dashboard},
  {path: '/users',name:'users',component: Users},
  {path: '/districts',name:'districts',component: Districts},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from, next) => {
  // Here I will check if the user has the right permissions for using my page
  next();
})


export default router
