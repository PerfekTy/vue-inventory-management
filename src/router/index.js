import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../lib/data/token'

import ProductsView from '../views/ProductsView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SettingsView from '@/views/SettingsView.vue'
import HomeView from '@/views/HomeView.vue'

const token = getToken()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: true
      }
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: {
        auth: true
      }
    },
    {
      path: '/:userId/settings',
      name: 'user settings',
      component: SettingsView,
      meta: {
        auth: true
      }
    },
    {
      path: '/sign-in',
      name: 'sign in',
      component: SignInView
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUpView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !token) {
    next({ name: 'sign in' })
  } else if (!to.meta.auth && token) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
