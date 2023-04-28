import { Login, Logout, GetUserInfo } from '@/api/apis'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    user: {},
    name: '',
    userid: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: '',
    roles: [],
    clubInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_CLUBINFO: (state, e) => {
    state.clubInfo = e
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, { name, userid }) => {
    state.name = name
    state.userid = userid
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, e) => {
    state.user = e
  }
}

// 全局方法
const actions = {
  // user login  登录方法
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      Login({ username: username.trim(), password: password }).then(data => {
        commit('SET_TOKEN', data.token_type + ' ' + data.access_token)
        setToken(data.token_type + ' ' + data.access_token, data.expires_in)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      GetUserInfo().then(response => {
        const { role, name, id } = response
        if (!response) {
          return reject('Verification failed, please Login again.')
        }
        // 必须保证不是一个空的数组
        if (!role) {
          reject('getInfo: roles must be a non-null array!')
        }
        // 修改用户登录信息 调用 commit方法
        commit('SET_ROLES', [role])
        commit('SET_NAME', { name, userid: id })
        commit('SET_USERINFO', response)
        // resolve(data)
        resolve({ roles: [role], name: name })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout  退出登录部分
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      Logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken() // must remove  token  first
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // dispatch('tagsView/delAllViews', null, { root: true })
        // commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token 清除登录信息 token什么的
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken() // must remove  token  first
      // commit('RESET_STATE')
      resolve()
    })
  },
  // 设置俱乐部信息
  setClubInfo({ commit }, e) {
    return new Promise(resolve => {
      commit('SET_CLUBINFO', e)
      resolve()
    })
  },

  // dynamically modify permissions 更改角色 这个方法登录的时候应该不调用 是在登录成功后切换角色使用的
  changeRoles({ commit, dispatch }, role) {
    // console.info("4.调用vuex changeRoles 方法 进入");
    return async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')// 调用这个文件里面的 getInfo方法
      resetRouter()
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

