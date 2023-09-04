import { createRouter, createWebHistory } from 'vue-router'

import Editor from '@/views/PageEditor.vue'


const routes = [
  {
    path: '/',
    name: 'Editor',
    component: Editor
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
