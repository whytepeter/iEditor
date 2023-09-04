import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('@/views/PageEditor.vue')
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/views/Preview.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})



export default router
