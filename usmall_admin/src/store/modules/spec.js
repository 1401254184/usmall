import {
    requestSpecList,
    requestSpecCount
  } from '../../util/request'
  
  const state = {
    //列表数据
    list: [],
    //一页的数量
    size: 2,
    //数据总数量
    total: 0,
    //当前的页码
    page: 1
  }
  const mutations = {
    // 改变list
    changeList(state,arr){
      arr.forEach(i => {
          i.attrs=JSON.parse(i.attrs)
      });
      state.list=arr;
  },
    //修改总数
    changeTotal(state, num) {
      state.total = num
    },
    //修改页码 
    changePage(state, page) {
      state.page = page
    }
  }
  
  const actions = {
    requestList(context) {
      const params = {
        page: context.state.page,
        size: context.state.size
      }
      requestSpecList(params).then(res => {
          //没有取到数据
          if(res.data.list.length==0&&context.state.page>0){
            context.commit("changePage",context.state.page-1);
            context.dispatch("requestList")
            return;
        }
        context.commit("changeList",res.data.list)
      })
    },
    //获取总的数量
    requestTotal(context) {
      requestSpecCount().then(res => {
        context.commit("changeTotal", res.data.list[0].total)
      })
    },
    //页面修改页码
    changePage(context, page) {
      context.commit("changePage", page)
    }
  }
  const getters = {
    list(state) {
      return state.list
    },
    total(state) {
      return state.total;
    },
    size(state) {
      return state.size
    }
  }
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
  }
  