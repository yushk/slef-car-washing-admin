import request from '@/utils/request'

export default {
  add(data) {
    return request({
      url: '/question/add',
      method: 'post',
      data
    })
  },
  list(params) {
    return request({
      url: '/question/list',
      method: 'get',
      params
    })
  },
  update(params, data) {
    return request({
      url: '/question/update',
      method: 'post',
      params,
      data
    })
  },
  del(params) {
    return request({
      url: '/question',
      method: 'delete',
      params
    })
  }
}
