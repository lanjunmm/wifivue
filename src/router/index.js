import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import chart from  '@/components/chart/chart'
import store from '@/store/store.js'

Vue.use(Router);

const   routes=[
  {
    path: '/',
    name: 'layout',
    component: layout
  },
  {
    path: '/chart',
    name: 'chart',
    component: chart
  }
  ];

export default new Router({
  routes:routes,
})
//vue-router路由配置
