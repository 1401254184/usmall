<template>
<div>

<el-container class="con">
  <el-aside width="200px">
<!-- 菜单 -->

  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
    
      background-color="#20222A"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

        <el-submenu index="2">
          <template slot="title">系统设置</template>
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/manage">管理员管理</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">商城管理</template>
          <el-menu-item index="/cate">商品分类</el-menu-item>
          <el-menu-item index="/spec">商品规格</el-menu-item>
          <el-menu-item index="/goods">商品管理</el-menu-item>
          <el-menu-item index="/member">会员管理</el-menu-item>
          <el-menu-item index="/banner">轮播图管理</el-menu-item>
          <el-menu-item index="/seckill">秒杀活动</el-menu-item>
        </el-submenu>
      
     
    </el-menu>


<!-- 菜单 -->
  </el-aside>
  <el-container>
     <el-header>
          <div class="header-con">
            <span>admin</span>
            <el-button type="primary">退出</el-button>
          </div>
        </el-header>
    <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
</el-breadcrumb>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</div>
</template>
<script>
export default {
 components: {
},
data() {
return {


};
 },
methods: {},
  mounted() {}
};
</script>
<style scoped>
.con{
    height: 100vh;
}
.el-aside{
    background: #20222A;
}
.el-header{
    background: #B3C0D1;
}
.header-con {
  float: right;
}
.header-con span {
  line-height: 60px;
  color: #ffffff;
}
</style>