import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 *
 * 筛选路由
 */

// 匹配权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // if (route.meta.roles.indexOf(roles) > -1) {
    //   return true
    // } else {
    //   return false
    // }
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes) // 将过滤后的路由和constantRoutes存起来
  }
}

// 筛选
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 过滤路由
      // accessedRoutes这个就是当前角色可见的动态路由
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
