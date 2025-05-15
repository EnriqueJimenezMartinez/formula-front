// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ViewNews from '@/views/ViewNews.vue'
import NewsGrid from '../views/NewsGrid.vue'
import PositionView from '@/views/PositionView.vue'
import Calendario from '@/views/Calendario.vue'
import ClasificacionCarrera from '@/views/RankingRaceView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        next({ name: 'Home' })
      } else {
        next()
      }
    },
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/News',
    name: 'NewsGrid',
    component: NewsGrid,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/news/:slug',
    name: 'ViewNews',
    component: ViewNews,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/Ranking',
    name: 'Ranking',
    component: PositionView,
    meta: { requiresAuth: true },
  },
  {
    path: '/Calendario',
    name: 'Calendario',
    component: Calendario,
    meta: { requiresAuth: true },
  },
  {
    path: '/clasificacion-carrera/:round',
    name: 'ClasificacionCarrera',
    component: ClasificacionCarrera,
    props: true,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 🚨 Protección global de rutas
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
