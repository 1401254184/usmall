import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: () => import('../pages/login/login')
  }, {
    path: "/",
    component: () => import('../pages/index/index'),
    children: [{
        path: "banner",
        component: () => import('../pages/banner/banner'),
        name: '轮播图列表'
      },
      {
        path: "cate",
        component: () => import('../pages/cate/cate'),
        name: "商品分类列表"
      },
      {
        path: "goods",
        component: () => import('../pages/goods/goods'),
        name: "商品列表"
      },
      {
        path: "home",
        component: () => import('../pages/home/home'),
      },
      {
        path: "manage",
        component: () => import('../pages/manage/manage'),
        name: "管理员列表"
      },
      {
        path: "member",
        component: () => import('../pages/member/member'),
        name: '会员列表'
      },
      {
        path: "menu",
        component: () => import('../pages/menu/menu'),
        name: '菜单列表'
      },
      {
        path: "role",
        component: () => import('../pages/role/role'),
        name: "角色列表"
      },
      {
        path: "seckill",
        component: () => import('../pages/seckill/seckill'),
        name: '活动列表'
      },
      {
        path: "spec",
        component: () => import('../pages/spec/spec'),
        name: '商品规格列表'
      },
      {
        path:"",
        redirect:"home"
      }
    ]
  },
]
})
