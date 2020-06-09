import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Article from '@/views/Article.vue'
import Me from '@/views/Me.vue'
import Setting from '@/views/Setting.vue'
import Posts from '@/views/Posts.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import { Store } from 'vuex'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/article/:id', component: Article },
  { path: '/me', component: Me, meta: { requireAuth: true } },
  { path: '/setting', component: Setting, meta: { requireAuth: true } },
  { path: '/posts', component: Posts, meta: { requireAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.isLogged) {
      next()
    } else {
      router.push({ path: '/login', query: { path: to.fullPath } })
    }
  } else {
    next()
  }
})

export default router
