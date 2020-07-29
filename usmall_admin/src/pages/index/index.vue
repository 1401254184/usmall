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

        <el-submenu v-show="hasChildren" :index="item.id+''" v-for="(item) in user.menus">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(i) in item.children" :key="i.title" :index="i.url">{{i.title}}</el-menu-item>
          </el-submenu>

          <!-- 没有目录，只有菜单 -->
         <el-menu-item v-show="!hasChildren"  :index="i.url" v-for="(i) in user.menus" :key="i.title">
            <span slot="title">{{i.title}}</span>
          </el-menu-item>
      
     
    </el-menu>


<!-- 菜单 -->
  </el-aside>
      <el-container>
        <el-header>
          <div class="header-con">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="exit">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'

export default {
    computed:{
      ...mapGetters({
          user:"user"
      }),
      // 判断是否有目录
      hasChildren(){
          return this.user.menus[0].children?true:false
      }
  },
 components: {
},
data() {
return {
};
 },
methods: {
   ...mapActions({
      changeUser: "changeUser",
    }),
    //退出
    exit() {
      this.changeUser(null);
      this.$router.push("/login")
    },
},
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