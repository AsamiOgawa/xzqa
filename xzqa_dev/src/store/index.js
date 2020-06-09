import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: 0,
    userName: '',
    nickName: '',
    articleNum: 0,
    isLogged: false
  },
  mutations: {
    // 删除文章后同步仓库的文章数据
    removeArticles(state, payload) {
      state.articleNum -= payload
    },
    // 修改用户个人信息后同步仓库用户的数据
    updateUserInfo(state, payload) {
      state.nickName = payload
    },
    // 已登录的用户个人信息
    loggedUserInfo(state, payload) {
      state.uid = payload.id
      state.userName = payload.username
      state.nickName = payload.nickname
      state.articleNum = payload.article_number
      state.isLogged = true
    },
    // 用户登出清除仓库的用户信息
    logoutUserInfo(state) {
      state.uid = 0
      state.userName = ''
      state.nickName = ''
      state.articleNum = 0
      state.isLogged = false
    }
  },
  actions: {
  },
  modules: {
  }
})
