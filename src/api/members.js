import request from '@/utils/request'

export default {
  getOne(params) {
    return request({
      url: '/collect_info',
      method: 'get',
      params
    })
  },
  list(params) {
    return request({
      url: '/collect_info/list',
      method: 'get',
      params
    })
  }
//   update(params, data) {
//     return request({
//       url: '/marry/update',
//       method: 'post',
//       params,
//       data
//     })
//   },
//   del(params) {
//     return request({
//       url: '/marry',
//       method: 'delete',
//       params
//     })
//   }
}
