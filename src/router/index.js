import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../lib/utils'

import ProductsView from '../views/ProductsView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const token = getToken()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: {
        auth: true
      }
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignInView,
      meta: {
        auth: false
      }
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUpView
    },
    {
      path: '/:catchAll(.*)',
      name: 'nof-found',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !token) {
    next({ name: 'signIn' })
  } else if (!to.meta.auth && token) {
    next({ name: 'products' })
  } else {
    next()
  }
})

export default router
