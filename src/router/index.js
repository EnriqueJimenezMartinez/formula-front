import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ViewNews from '@/views/ViewNews.vue'
import NewsGrid from '../views/NewsGrid.vue'
import PositionView from '@/views/PositionView.vue'
import Calendario from '@/views/Calendario.vue'
import ClasificacionCarrera from '@/views/RankingRaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/', name: 'Home', component: HomeView },
    { path: '/News', name: 'NewsGrid', component: NewsGrid },
    { path: '/about', name: 'about', component: () => import('../views/LoginView.vue') },
    { path: '/news/:slug', name: 'ViewNews', component: ViewNews, props: true },
    { path: '/Ranking', name: 'Ranking', component: PositionView },
    { path: '/Calendario', name: 'Calendario', component: Calendario },
    {
      path: '/clasificacion-carrera/:round',
      name: 'ClasificacionCarrera',
      component: ClasificacionCarrera,
      props: true,
    },
  ],
})

export default router
