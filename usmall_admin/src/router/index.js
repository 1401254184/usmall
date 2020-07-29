import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'


Vue.use(Router)
//路由独享首位
function havePower(url){
  return store.state.user.menus_url.some(i=>i==url)
}
let router=new Router({
  routes: [{
    path: '/login',
    component: () => import('../pages/login/login')
  }, {
    path: "/",
    component: () => import('../pages/index/index'),
    children: [{
        path: "banner",
        component: () => import('../pages/banner/banner'),
        name: '轮播图列表',
        beforeEnter(to,from,next){
          havePower('/banner')?next():next("/home")
        }
      },
      {
        path: "cate",
        component: () => import('../pages/cate/cate'),
        name: "商品分类列表",
        beforeEnter(to,from,next){
          havePower('/cate')?next():next("/home")
        }
      },
      {
        path: "goods",
        component: () => import('../pages/goods/goods'),
        name: "商品列表",
        beforeEnter(to,from,next){
          havePower('/goods')?next():next("/home")
        }
      },
      {
        path: "home",
        component: () => import('../pages/home/home'),
      },
      {
        path: "manage",
        component: () => import('../pages/manage/manage'),
        name: "管理员列表",
        beforeEnter(to,from,next){
          havePower('/manage')?next():next("/home")
        }
      },
      {
        path: "member",
        component: () => import('../pages/member/member'),
        name: '会员列表',
        beforeEnter(to,from,next){
          havePower('/member')?next():next("/home")
        }
      },
      {
        path: "menu",
        component: () => import('../pages/menu/menu'),
        name: '菜单列表',
        beforeEnter(to,from,next){
          havePower('/menu')?next():next("/home")
        }
      },
      {
        path: "role",
        component: () => import('../pages/role/role'),
        name: "角色列表",
        beforeEnter(to,from,next){
          havePower('/role')?next():next("/home")
        }
      },
      {
        path: "seckill",
        component: () => import('../pages/seckill/seckill'),
        name: '活动列表',
        beforeEnter(to,from,next){
          havePower('/seckill')?next():next("/home")
        }
      },
      {
        path: "spec",
        component: () => import('../pages/spec/spec'),
        name: '商品规格列表',
        beforeEnter(to,from,next){
          havePower('/spec')?next():next("/home")
        }
      },
      {
        path:"",
        redirect:"home"
      }
    ]
  },
]
})

// 登录拦截
router.beforeEach((to,from,next)=>{
  //如果前往登录
  if(to.path=='/login'){
    next();
    return;
  }
  //不是去登录
  if(store.state.user){
    next();
    return;
  }
  next("/login")
})


export default router