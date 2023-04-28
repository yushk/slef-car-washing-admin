import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(e) {
  return request({
    url: '/user',
    method: 'get',
    params: { token: e }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// -------
export function createUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}
export function getUsers(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}
export function updateUser(params, data) {
  return request({
    url: '/user/update',
    method: 'post',
    params,
    data
  })
}

export function delUser(params) {
  return request({
    url: '/user',
    method: 'delete',
    params
  })
}
