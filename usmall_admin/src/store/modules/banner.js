import {
    requestBannerList
  } from '../../util/request'
  
  const state = {
    list: []
  }
  const mutations = {
    changeBannerList(state, arr) {
      state.list = arr
    }
  }
  const actions = {
    requestList(context) {
        requestBannerList().then(res => {
        context.commit("changeBannerList", res.data.list)
      })
    }
  }
  const getters = {
    list(state) {
      return state.list
    }
  }
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
  }
  