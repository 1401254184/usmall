import {
  menuList
} from '../../util/request'

const state = {
  list: []
}
const mutations = {
  changeMenuList(state, arr) {
    state.list = arr
  }
}
const actions = {
  requestList(context) {
    menuList({
      istree: true
    }).then(res => {
      context.commit("changeMenuList", res.data.list)
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
