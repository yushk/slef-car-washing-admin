import request from '@/utils/request'

export default {
  add(data) {
    return request({
      url: '/marry/add',
      method: 'post',
      data
    })
  },
  list(params) {
    return request({
      url: '/marry/list',
      method: 'get',
      params
    })
  },
  update(params, data) {
    return request({
      url: '/marry/update',
      method: 'post',
      params,
      data
    })
  },
  del(params) {
    return request({
      url: '/marry',
      method: 'delete',
      params
    })
  }
}
