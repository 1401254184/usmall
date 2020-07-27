import {
    requestRoleList
  } from '../../util/request'
  
  const state = {
    list: []
  }
  const mutations = {
    changeRoleList(state, arr) {
      state.list = arr
    }
  }
  const actions = {
    requestList(context) {
      requestRoleList().then(res => {
        context.commit("changeRoleList", res.data.list)
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
  