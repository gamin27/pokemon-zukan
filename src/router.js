import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Zukan from '@/views/Zukan'
import ZukanDetail from '@/views/ZukanDetail'
import Temoti from '@/views/Temoti'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'zukan',
      path: '/zukan',
      component: Zukan,
    },
    {
      name: 'zukan-detail',
      path: '/zukan/:id',
      component: ZukanDetail,
      props: (route) => ({
        p_id: Number(route.params.id),
        p_name: String(route.params.name),
        p_types: route.params.types,
        p_spriteURL: String(route.params.spriteURL),
        p_bk: String(route.params.backPage),
      }),
    },
    {
      name: 'temoti',
      path: '/temoti',
      component: Temoti,
    },
  ],
})

export default router
