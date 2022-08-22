import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/me'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: "home"
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("@/views/Home.vue")
  },
  {
    path: '/clockin',
    name: 'clockin',
    component: () => import("@/views/Clockin.vue")
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import("@/views/Forum.vue")
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import("@/views/Mine.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Login.vue")
  },
  {
    path: '/clockinRecord',
    name: 'clockinRecord',
    component: () => import("@/views/ClockinRecord.vue")
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {      //每一次路由跳转之前执行
  if (to.name == "login") {
    next()
  } else {
    if (!getToken()) {
      next("login")
    } else {
      next()
    }

  }
  // if(to.path == "/car"){         //判断要去的路由组件是哪  如果多个组件需要判断可以使用meta自定义属性
  //     if(localStorage.getItem("token")){
  //         next();
  //     }else{
  //         next("/login")
  //     }
  // }
  // next()
})

export default router
