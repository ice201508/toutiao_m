import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
    // component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:article_id',
    name: 'article',
    component: () => import('@/views/article'),
    // 动态路由  路由组件传参， 通过这个props属性，将我们的组件和路由解耦
    // 这样就可以在组件的 props里面 获取到这个id
    props: true
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', //默认子路由, 首页
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
