/**
 * @summary 俱乐部等级评定
 * @description 俱乐部等级评定系统API
 * @version 0.0.1
 */

import axios from 'axios'
let domain = 'http://localhost:7010/'
let axiosInstance = axios.create()
export const getDomain = () => {
  return domain
}
export const setDomain = ($domain) => {
  domain = $domain
}
export const getAxiosInstance = () => {
  return axiosInstance
}
export const setAxiosInstance = ($axiosInstance) => {
  axiosInstance = $axiosInstance
}

export const request = (method, url, params, config = {}) => {
  method = method.toLowerCase()
  let configs = {
    baseURL: domain,
    method: method,
    url: url,
    params: params.querys,
    headers: params.headers,
    data: params.body
  }
  configs = Object.assign(configs, config)
  return axiosInstance(configs)
}

/**
 * @name Token
 * @method post
 * @summary 权限认证
 * @description 权限认证
 * @param { String } [formData] username - 用户名
 * @param { String } [formData] password - 密码
 * @param { String } [formData] grant_type - 认证类型
 * @param { Array } [formData] scope - 参数
 */
export const Token = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.headers['Accept'] = 'application/json'
  url = '/v1/oauth/token'
  params.body = new URLSearchParams()
  if (parameters['username'] !== undefined) {
    params.body.append('username', parameters['username'])
  }
  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: username'))
  }
  if (parameters['password'] !== undefined) {
    params.body.append('password', parameters['password'])
  }
  if (parameters['password'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: password'))
  }
  if (parameters['grant_type'] !== undefined) {
    params.body.append('grant_type', parameters['grant_type'])
  }
  if (parameters['grant_type'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: grant_type'))
  }
  if (parameters['scope'] !== undefined) {
    params.body.append('scope', parameters['scope'])
  }
  return request('post', url, params, config)
}
/**
 * @name TokenURL
 */
export const TokenURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/oauth/token'
  // formData username
  // formData password
  // formData grant_type
  // formData scope
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name WXLogin
 * @method get
 * @summary 小程序用户登录
 * @description 小程序用户登录
 * @param { String } [query] code - 登录code
 */
export const WXLogin = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/wx/login'

  if (parameters['code'] !== undefined) {
    params.querys['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: code'))
  }
  return request('get', url, params, config)
}
/**
 * @name WXLoginURL
 */
export const WXLoginURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/wx/login'
  querys['code'] = parameters['code']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetPhoneNumber
 * @method get
 * @summary 获取手机号
 * @description 获取手机号
 * @param { String } [query] code - 换取手机号code
 */
export const GetPhoneNumber = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/wx/phone'

  if (parameters['code'] !== undefined) {
    params.querys['code'] = parameters['code']
  }
  if (parameters['code'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: code'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetPhoneNumberURL
 */
export const GetPhoneNumberURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/wx/phone'
  querys['code'] = parameters['code']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name Login
 * @method post
 * @summary 用户登陆
 * @description 用户登陆
 * @param { String } [formData] username - 用户名
 * @param { String } [formData] password - 密码
 */
export const Login = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.headers['Accept'] = 'application/json'
  url = '/v1/login'
  params.body = new URLSearchParams()
  if (parameters['username'] !== undefined) {
    params.body.append('username', parameters['username'])
  }
  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: username'))
  }
  if (parameters['password'] !== undefined) {
    params.body.append('password', parameters['password'])
  }
  if (parameters['password'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: password'))
  }
  return request('post', url, params, config)
}
/**
 * @name LoginURL
 */
export const LoginURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/login'
  // formData username
  // formData password
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name Logout
 * @method post
 * @summary 用户登出
 * @description 用户登出
 */
export const Logout = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/logout'

  return request('post', url, params, config)
}
/**
 * @name LogoutURL
 */
export const LogoutURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/logout'
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetSTSToken
 * @method get
 * @summary oss ststoken
 * @description 获取oss 临时token
 */
export const GetSTSToken = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/osssts'

  return request('get', url, params, config)
}
/**
 * @name GetSTSTokenURL
 */
export const GetSTSTokenURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/osssts'
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetUser
 * @method get
 * @summary 获取用户信息
 * @description 获取单个用户的详细信息
 * @param { String } [path] id - 用户ID
 */
export const GetUser = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/user/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetUserURL
 */
export const GetUserURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/user/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateUser
 * @method put
 * @summary 编辑用户
 * @description 编辑单个用户信息
 * @param { String } [path] id - 用户ID
 * @param { Object } [body] body - 用户参数
 */
export const UpdateUser = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/user/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateUserURL
 */
export const UpdateUserURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/user/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteUser
 * @method delete
 * @summary 删除用户
 * @description 删除单个用户
 * @param { String } [path] id - 用户ID
 */
export const DeleteUser = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/user/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteUserURL
 */
export const DeleteUserURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/user/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name ChangeUserPassword
 * @method patch
 * @summary 修改密码
 * @description 修改密码
 * @param { String } [path] id - 用户ID
 * @param { String } [formData] username - 用户名
 * @param { String } [formData] password - 密码
 * @param { String } [formData] openid - 用户名
 */
export const ChangeUserPassword = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.headers['Accept'] = 'application/json'
  url = '/v1/user/{id}'
  params.body = new URLSearchParams()
  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['username'] !== undefined) {
    params.body.append('username', parameters['username'])
  }
  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: username'))
  }
  if (parameters['password'] !== undefined) {
    params.body.append('password', parameters['password'])
  }
  if (parameters['password'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: password'))
  }
  if (parameters['openid'] !== undefined) {
    params.body.append('openid', parameters['openid'])
  }
  return request('patch', url, params, config)
}
/**
 * @name ChangeUserPasswordURL
 */
export const ChangeUserPasswordURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/user/{id}'
  url = url.replace('{id}', parameters['id'])
  // formData username
  // formData password
  // formData openid
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetUserInfo
 * @method get
 * @summary 获取当前用户信息
 * @description 获取当前用户信息
 */
export const GetUserInfo = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/user'

  return request('get', url, params, config)
}
/**
 * @name GetUserInfoURL
 */
export const GetUserInfoURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/user'
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateUser
 * @method post
 * @summary 创建用户
 * @description 创建用户
 * @param { Object } [body] body - 用户信息
 */
export const CreateUser = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/user'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateUserURL
 */
export const CreateUserURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/user'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name ModifyUserPassword
 * @method patch
 * @summary 修改密码
 * @description 修改密码
 * @param { String } [query] username - 用户名
 * @param { String } [formData] old_password - 原始密码
 * @param { String } [formData] new_password - 新密码
 */
export const ModifyUserPassword = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.headers['Accept'] = 'application/json'
  url = '/v1/user'
  params.body = new URLSearchParams()
  if (parameters['username'] !== undefined) {
    params.querys['username'] = parameters['username']
  }
  if (parameters['old_password'] !== undefined) {
    params.body.append('old_password', parameters['old_password'])
  }
  if (parameters['old_password'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: old_password'))
  }
  if (parameters['new_password'] !== undefined) {
    params.body.append('new_password', parameters['new_password'])
  }
  if (parameters['new_password'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: new_password'))
  }
  return request('patch', url, params, config)
}
/**
 * @name ModifyUserPasswordURL
 */
export const ModifyUserPasswordURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/user'
  querys['username'] = parameters['username']
  // formData old_password
  // formData new_password
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetUsers
 * @method get
 * @summary 获取用户列表
 * @description 获取用户列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetUsers = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/users'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetUsersURL
 */
export const GetUsersURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/users'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetPersonal
 * @method get
 * @summary 获取个人基础信息
 * @description 获取个人基础信息
 * @param { String } [path] id - 个人基础信息ID
 */
export const GetPersonal = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/personal/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetPersonalURL
 */
export const GetPersonalURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/personal/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdatePersonal
 * @method put
 * @summary 编辑个人基础信息
 * @description 编辑个人基础信息
 * @param { String } [path] id - 个人基础信息ID
 * @param { Object } [body] body - 个人基础信息参数
 */
export const UpdatePersonal = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/personal/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdatePersonalURL
 */
export const UpdatePersonalURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/personal/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeletePersonal
 * @method delete
 * @summary 删除个人基础信息
 * @description 删除个人基础信息
 * @param { String } [path] id - 个人基础信息ID
 */
export const DeletePersonal = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/personal/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeletePersonalURL
 */
export const DeletePersonalURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/personal/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreatePersonal
 * @method post
 * @summary 创建个人基础信息
 * @description 创建个人基础信息
 * @param { Object } [body] body - 个人基础信息
 */
export const CreatePersonal = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/personal'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreatePersonalURL
 */
export const CreatePersonalURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/personal'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetPersonals
 * @method get
 * @summary 获取个人基础信息列表
 * @description 获取个人基础信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetPersonals = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/personals'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetPersonalsURL
 */
export const GetPersonalsURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/personals'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetCaseData
 * @method get
 * @summary 获取病例数据信息
 * @description 获取病例数据信息
 * @param { String } [path] id - 病例数据信息ID
 */
export const GetCaseData = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/caseData/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetCaseDataURL
 */
export const GetCaseDataURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/caseData/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateCaseData
 * @method put
 * @summary 编辑病例数据信息
 * @description 编辑病例数据信息
 * @param { String } [path] id - 病例数据信息ID
 * @param { Object } [body] body - 病例数据信息参数
 */
export const UpdateCaseData = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/caseData/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateCaseDataURL
 */
export const UpdateCaseDataURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/caseData/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteCaseData
 * @method delete
 * @summary 删除病例数据信息
 * @description 删除病例数据信息
 * @param { String } [path] id - 病例数据信息ID
 */
export const DeleteCaseData = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/caseData/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteCaseDataURL
 */
export const DeleteCaseDataURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/caseData/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateCaseData
 * @method post
 * @summary 创建病例数据信息
 * @description 创建病例数据信息
 * @param { Object } [body] body - 病例数据信息
 */
export const CreateCaseData = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/caseData'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateCaseDataURL
 */
export const CreateCaseDataURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/caseData'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetCaseDatas
 * @method get
 * @summary 获取病例数据信息列表
 * @description 获取病例数据信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetCaseDatas = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/caseDatas'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetCaseDatasURL
 */
export const GetCaseDatasURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/caseDatas'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetClass
 * @method get
 * @summary 获取班级信息
 * @description 获取班级信息
 * @param { String } [path] id - 班级信息ID
 */
export const GetClass = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/class/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetClassURL
 */
export const GetClassURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/class/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateClass
 * @method put
 * @summary 编辑班级信息
 * @description 编辑班级信息
 * @param { String } [path] id - 班级信息ID
 * @param { Object } [body] body - 班级信息参数
 */
export const UpdateClass = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/class/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateClassURL
 */
export const UpdateClassURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/class/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteClass
 * @method delete
 * @summary 删除班级信息
 * @description 删除班级信息
 * @param { String } [path] id - 班级信息ID
 */
export const DeleteClass = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/class/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteClassURL
 */
export const DeleteClassURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/class/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateClass
 * @method post
 * @summary 创建班级信息
 * @description 创建班级信息
 * @param { Object } [body] body - 班级信息
 */
export const CreateClass = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/class'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateClassURL
 */
export const CreateClassURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/class'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetClasses
 * @method get
 * @summary 获取班级信息列表
 * @description 获取班级信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetClasses = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/classes'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetClassesURL
 */
export const GetClassesURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/classes'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetMeasureDetail
 * @method get
 * @summary 获取测评数据明细信息
 * @description 获取测评数据明细信息
 * @param { String } [path] id - 测评数据明细信息ID
 */
export const GetMeasureDetail = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureDetail/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetMeasureDetailURL
 */
export const GetMeasureDetailURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureDetail/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateMeasureDetail
 * @method put
 * @summary 编辑测评数据明细信息
 * @description 编辑测评数据明细信息
 * @param { String } [path] id - 测评数据明细信息ID
 * @param { Object } [body] body - 测评数据明细信息参数
 */
export const UpdateMeasureDetail = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureDetail/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateMeasureDetailURL
 */
export const UpdateMeasureDetailURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureDetail/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteMeasureDetail
 * @method delete
 * @summary 删除测评数据明细信息
 * @description 删除测评数据明细信息
 * @param { String } [path] id - 测评数据明细信息ID
 */
export const DeleteMeasureDetail = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureDetail/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteMeasureDetailURL
 */
export const DeleteMeasureDetailURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureDetail/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateMeasureDetail
 * @method post
 * @summary 创建测评数据明细信息
 * @description 创建测评数据明细信息
 * @param { Object } [body] body - 测评数据明细信息
 */
export const CreateMeasureDetail = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureDetail'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateMeasureDetailURL
 */
export const CreateMeasureDetailURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureDetail'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetMeasureDetails
 * @method get
 * @summary 获取测评数据明细信息列表
 * @description 获取测评数据明细信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetMeasureDetails = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureDetails'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetMeasureDetailsURL
 */
export const GetMeasureDetailsURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureDetails'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetMeasureResult
 * @method get
 * @summary 获取测评数据结果分析信息
 * @description 获取测评数据结果分析信息
 * @param { String } [path] id - 测评数据结果分析信息ID
 */
export const GetMeasureResult = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureResult/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetMeasureResultURL
 */
export const GetMeasureResultURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureResult/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateMeasureResult
 * @method put
 * @summary 编辑测评数据结果分析信息
 * @description 编辑测评数据结果分析信息
 * @param { String } [path] id - 测评数据结果分析信息ID
 * @param { Object } [body] body - 测评数据结果分析信息参数
 */
export const UpdateMeasureResult = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureResult/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateMeasureResultURL
 */
export const UpdateMeasureResultURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureResult/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteMeasureResult
 * @method delete
 * @summary 删除测评数据结果分析信息
 * @description 删除测评数据结果分析信息
 * @param { String } [path] id - 测评数据结果分析信息ID
 */
export const DeleteMeasureResult = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureResult/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteMeasureResultURL
 */
export const DeleteMeasureResultURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureResult/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateMeasureResult
 * @method post
 * @summary 创建测评数据结果分析信息
 * @description 创建测评数据结果分析信息
 * @param { Object } [body] body - 测评数据结果分析信息
 */
export const CreateMeasureResult = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureResult'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateMeasureResultURL
 */
export const CreateMeasureResultURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureResult'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetMeasureResults
 * @method get
 * @summary 获取测评数据结果分析信息列表
 * @description 获取测评数据结果分析信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetMeasureResults = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/measureResults'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetMeasureResultsURL
 */
export const GetMeasureResultsURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/measureResults'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetMoveData
 * @method get
 * @summary 获取运动数据信息
 * @description 获取运动数据信息
 * @param { String } [path] id - 运动数据信息ID
 */
export const GetMoveData = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/moveData/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetMoveDataURL
 */
export const GetMoveDataURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/moveData/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateMoveData
 * @method put
 * @summary 编辑运动数据信息
 * @description 编辑运动数据信息
 * @param { String } [path] id - 运动数据信息ID
 * @param { Object } [body] body - 运动数据信息参数
 */
export const UpdateMoveData = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/moveData/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateMoveDataURL
 */
export const UpdateMoveDataURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/moveData/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteMoveData
 * @method delete
 * @summary 删除运动数据信息
 * @description 删除运动数据信息
 * @param { String } [path] id - 运动数据信息ID
 */
export const DeleteMoveData = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/moveData/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteMoveDataURL
 */
export const DeleteMoveDataURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/moveData/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateMoveData
 * @method post
 * @summary 创建运动数据信息
 * @description 创建运动数据信息
 * @param { Object } [body] body - 运动数据信息
 */
export const CreateMoveData = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/moveData'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateMoveDataURL
 */
export const CreateMoveDataURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/moveData'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetMoveDatas
 * @method get
 * @summary 获取运动数据信息列表
 * @description 获取运动数据信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetMoveDatas = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/moveDatas'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetMoveDatasURL
 */
export const GetMoveDatasURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/moveDatas'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetMovePrescription
 * @method get
 * @summary 获取运动处方信息
 * @description 获取运动处方信息
 * @param { String } [path] id - 运动处方信息ID
 */
export const GetMovePrescription = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/movePrescription/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetMovePrescriptionURL
 */
export const GetMovePrescriptionURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/movePrescription/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateMovePrescription
 * @method put
 * @summary 编辑运动处方信息
 * @description 编辑运动处方信息
 * @param { String } [path] id - 运动处方信息ID
 * @param { Object } [body] body - 运动处方信息参数
 */
export const UpdateMovePrescription = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/movePrescription/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateMovePrescriptionURL
 */
export const UpdateMovePrescriptionURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/movePrescription/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteMovePrescription
 * @method delete
 * @summary 删除运动处方信息
 * @description 删除运动处方信息
 * @param { String } [path] id - 运动处方信息ID
 */
export const DeleteMovePrescription = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/movePrescription/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteMovePrescriptionURL
 */
export const DeleteMovePrescriptionURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/movePrescription/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateMovePrescription
 * @method post
 * @summary 创建运动处方信息
 * @description 创建运动处方信息
 * @param { Object } [body] body - 运动处方信息
 */
export const CreateMovePrescription = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/movePrescription'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateMovePrescriptionURL
 */
export const CreateMovePrescriptionURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/movePrescription'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetMovePrescriptions
 * @method get
 * @summary 获取运动处方信息列表
 * @description 获取运动处方信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetMovePrescriptions = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/movePrescriptions'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetMovePrescriptionsURL
 */
export const GetMovePrescriptionsURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/movePrescriptions'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetCourse
 * @method get
 * @summary 获取课程信息
 * @description 获取课程信息
 * @param { String } [path] id - 课程信息ID
 */
export const GetCourse = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/course/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetCourseURL
 */
export const GetCourseURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/course/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateCourse
 * @method put
 * @summary 编辑课程信息
 * @description 编辑课程信息
 * @param { String } [path] id - 课程信息ID
 * @param { Object } [body] body - 课程信息参数
 */
export const UpdateCourse = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/course/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateCourseURL
 */
export const UpdateCourseURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/course/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteCourse
 * @method delete
 * @summary 删除课程信息
 * @description 删除课程信息
 * @param { String } [path] id - 课程信息ID
 */
export const DeleteCourse = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/course/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteCourseURL
 */
export const DeleteCourseURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/course/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateCourse
 * @method post
 * @summary 创建课程信息
 * @description 创建课程信息
 * @param { Object } [body] body - 课程信息
 */
export const CreateCourse = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/course'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateCourseURL
 */
export const CreateCourseURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/course'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetCourses
 * @method get
 * @summary 获取课程信息列表
 * @description 获取课程信息列表
 * @param { String } [query] sort - 排序方式
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetCourses = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/courses'

  if (parameters['sort'] !== undefined) {
    params.querys['sort'] = parameters['sort']
  }
  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetCoursesURL
 */
export const GetCoursesURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/courses'
  querys['sort'] = parameters['sort']
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetWork
 * @method get
 * @summary 获取作业信息
 * @description 获取作业信息
 * @param { String } [path] id - 作业信息ID
 */
export const GetWork = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/work/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetWorkURL
 */
export const GetWorkURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/work/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateWork
 * @method put
 * @summary 编辑作业信息
 * @description 编辑作业信息
 * @param { String } [path] id - 作业信息ID
 * @param { Object } [body] body - 作业信息参数
 */
export const UpdateWork = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/work/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateWorkURL
 */
export const UpdateWorkURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/work/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteWork
 * @method delete
 * @summary 删除作业信息
 * @description 删除作业信息
 * @param { String } [path] id - 作业信息ID
 */
export const DeleteWork = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/work/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteWorkURL
 */
export const DeleteWorkURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/work/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateWork
 * @method post
 * @summary 创建作业信息
 * @description 创建作业信息
 * @param { Object } [body] body - 作业信息
 */
export const CreateWork = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/work'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateWorkURL
 */
export const CreateWorkURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/work'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetWorks
 * @method get
 * @summary 获取作业信息列表
 * @description 获取作业信息列表
 * @param { String } [query] sort - 排序方式
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetWorks = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/works'

  if (parameters['sort'] !== undefined) {
    params.querys['sort'] = parameters['sort']
  }
  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetWorksURL
 */
export const GetWorksURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/works'
  querys['sort'] = parameters['sort']
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetWorkSubmit
 * @method get
 * @summary 获取作业提交信息
 * @description 获取作业提交信息
 * @param { String } [path] id - 作业提交信息ID
 */
export const GetWorkSubmit = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/workSubmit/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetWorkSubmitURL
 */
export const GetWorkSubmitURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/workSubmit/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateWorkSubmit
 * @method put
 * @summary 编辑作业提交信息
 * @description 编辑作业提交信息
 * @param { String } [path] id - 作业提交信息ID
 * @param { Object } [body] body - 作业提交信息参数
 */
export const UpdateWorkSubmit = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/workSubmit/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateWorkSubmitURL
 */
export const UpdateWorkSubmitURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/workSubmit/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteWorkSubmit
 * @method delete
 * @summary 删除作业提交信息
 * @description 删除作业提交信息
 * @param { String } [path] id - 作业提交信息ID
 */
export const DeleteWorkSubmit = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/workSubmit/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteWorkSubmitURL
 */
export const DeleteWorkSubmitURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/workSubmit/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateWorkSubmit
 * @method post
 * @summary 创建作业提交信息
 * @description 创建作业提交信息
 * @param { Object } [body] body - 作业提交信息
 */
export const CreateWorkSubmit = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/workSubmit'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateWorkSubmitURL
 */
export const CreateWorkSubmitURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/workSubmit'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetWorkSubmits
 * @method get
 * @summary 获取作业提交信息列表
 * @description 获取作业提交信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetWorkSubmits = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/workSubmits'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetWorkSubmitsURL
 */
export const GetWorkSubmitsURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/workSubmits'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetComment
 * @method get
 * @summary 学生评论信息
 * @description 获取评论信息
 * @param { String } [path] id - 评论信息ID
 */
export const GetComment = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/comment/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetCommentURL
 */
export const GetCommentURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/comment/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateComment
 * @method put
 * @summary 编辑学生评论信息
 * @description 编辑评论信息
 * @param { String } [path] id - 评论信息ID
 * @param { Object } [body] body - 评论信息参数
 */
export const UpdateComment = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/comment/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateCommentURL
 */
export const UpdateCommentURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/comment/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteComment
 * @method delete
 * @summary 删除学生提交信息
 * @description 删除评论信息
 * @param { String } [path] id - 评论信息ID
 */
export const DeleteComment = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/comment/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteCommentURL
 */
export const DeleteCommentURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/comment/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateComment
 * @method post
 * @summary 创建学生评论信息
 * @description 创建评论信息
 * @param { Object } [body] body - 评论信息
 */
export const CreateComment = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/comment'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateCommentURL
 */
export const CreateCommentURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/comment'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetComments
 * @method get
 * @summary 获取学生评论信息列表
 * @description 获取评论信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetComments = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/Comments'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetCommentsURL
 */
export const GetCommentsURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/Comments'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetSportType
 * @method get
 * @summary 获取类别
 * @description 获取类别
 * @param { String } [path] id - 运动类别ID
 */
export const GetSportType = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportType/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetSportTypeURL
 */
export const GetSportTypeURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportType/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateSportType
 * @method put
 * @summary 编辑类别
 * @description 编辑类别
 * @param { String } [path] id - 运动类别ID
 * @param { Object } [body] body - 运动类别参数
 */
export const UpdateSportType = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportType/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateSportTypeURL
 */
export const UpdateSportTypeURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportType/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteSportType
 * @method delete
 * @summary 删除类别
 * @description 删除类别
 * @param { String } [path] id - 运动类别ID
 */
export const DeleteSportType = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportType/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteSportTypeURL
 */
export const DeleteSportTypeURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportType/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateSportType
 * @method post
 * @summary 创建类别典表
 * @description 创建类别典表
 * @param { Object } [body] body - 运动类别
 */
export const CreateSportType = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportType'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateSportTypeURL
 */
export const CreateSportTypeURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportType'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetSportTypes
 * @method get
 * @summary 获取类别列表
 * @description 获取类别列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetSportTypes = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportTypes'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetSportTypesURL
 */
export const GetSportTypesURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportTypes'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetHomeWork
 * @method get
 * @summary 获取申报信息
 * @description 获取申报信息
 * @param { String } [path] id - 申报ID
 */
export const GetHomeWork = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/homeWork/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetHomeWorkURL
 */
export const GetHomeWorkURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/homeWork/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateHomeWork
 * @method put
 * @summary 编辑申报信息
 * @description 编辑申报信息
 * @param { String } [path] id - 作业信息ID
 * @param { Object } [body] body - 作业信息参数
 */
export const UpdateHomeWork = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/homeWork/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateHomeWorkURL
 */
export const UpdateHomeWorkURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/homeWork/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteHomeWork
 * @method delete
 * @summary 删除申报信息
 * @description 删除申报信息
 * @param { String } [path] id - 作业信息ID
 */
export const DeleteHomeWork = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/homeWork/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteHomeWorkURL
 */
export const DeleteHomeWorkURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/homeWork/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateHomeWork
 * @method post
 * @summary 创建申报信息
 * @description 创建申报信息
 * @param { Object } [body] body - 作业信息
 */
export const CreateHomeWork = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/homeWork'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateHomeWorkURL
 */
export const CreateHomeWorkURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/homeWork'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetHomeWorks
 * @method get
 * @summary 获取申报信息列表
 * @description 获取申报信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetHomeWorks = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/homeWorks'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetHomeWorksURL
 */
export const GetHomeWorksURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/homeWorks'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetSolution
 * @method get
 * @summary 获取学生提交作业信息
 * @description 获取学生提交作业信息
 * @param { String } [path] id - 学生提交作业信息ID
 */
export const GetSolution = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/solution/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetSolutionURL
 */
export const GetSolutionURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/solution/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateSolution
 * @method put
 * @summary 编辑学生提交作业信息
 * @description 编辑学生提交作业信息
 * @param { String } [path] id - 学生提交作业信息ID
 * @param { Object } [body] body - 学生提交作业信息参数
 */
export const UpdateSolution = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/solution/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateSolutionURL
 */
export const UpdateSolutionURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/solution/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteSolution
 * @method delete
 * @summary 删除学生提交作业信息
 * @description 删除学生提交作业信息
 * @param { String } [path] id - 学生提交作业信息ID
 */
export const DeleteSolution = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/solution/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteSolutionURL
 */
export const DeleteSolutionURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/solution/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateSolution
 * @method post
 * @summary 创建学生提交作业信息
 * @description 创建学生提交作业信息
 * @param { Object } [body] body - 学生提交作业信息
 */
export const CreateSolution = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/solution'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateSolutionURL
 */
export const CreateSolutionURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/solution'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetSolutions
 * @method get
 * @summary 获取学生提交作业信息列表
 * @description 获取学生提交作业信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetSolutions = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/solutions'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetSolutionsURL
 */
export const GetSolutionsURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/solutions'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetSportItem
 * @method get
 * @summary 获取申请模板配置信息
 * @description 获取申请模板配置信息
 * @param { String } [path] id - 申请模板配置信息ID
 */
export const GetSportItem = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportItem/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('get', url, params, config)
}
/**
 * @name GetSportItemURL
 */
export const GetSportItemURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportItem/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateSportItem
 * @method put
 * @summary 编辑申请模板配置信息
 * @description 编辑申请模板配置信息
 * @param { String } [path] id - 申请模板配置信息ID
 * @param { Object } [body] body - 申请模板配置信息参数
 */
export const UpdateSportItem = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportItem/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateSportItemURL
 */
export const UpdateSportItemURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportItem/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteSportItem
 * @method delete
 * @summary 删除申请模板配置信息
 * @description 删除申请模板配置信息
 * @param { String } [path] id - 申请模板配置信息ID
 */
export const DeleteSportItem = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportItem/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteSportItemURL
 */
export const DeleteSportItemURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportItem/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateSportItem
 * @method post
 * @summary 创建申请模板配置信息
 * @description 创建申请模板配置信息
 * @param { Object } [body] body - 申请模板配置信息
 */
export const CreateSportItem = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportItem'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateSportItemURL
 */
export const CreateSportItemURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportItem'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetSportItems
 * @method get
 * @summary 获取申请模板配置列表
 * @description 获取申请模板配置列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetSportItems = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/sportItems'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetSportItemsURL
 */
export const GetSportItemsURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/sportItems'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UpdateEvaluateInfo
 * @method put
 * @summary 编辑评价信息
 * @description 编辑评价信息
 * @param { String } [path] id - 评价信息ID
 * @param { Object } [body] body - 评价信息参数
 */
export const UpdateEvaluateInfo = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/evaluateInfo/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  return request('put', url, params, config)
}
/**
 * @name UpdateEvaluateInfoURL
 */
export const UpdateEvaluateInfoURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/evaluateInfo/{id}'
  url = url.replace('{id}', parameters['id'])
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DeleteEvaluateInfo
 * @method delete
 * @summary 删除评价信息
 * @description 删除评价信息
 * @param { String } [path] id - 评价信息ID
 */
export const DeleteEvaluateInfo = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/evaluateInfo/{id}'

  if (parameters['id'] !== undefined) {
    url = url.replace('{id}', parameters['id'])
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required String parameter: id'))
  }
  return request('delete', url, params, config)
}
/**
 * @name DeleteEvaluateInfoURL
 */
export const DeleteEvaluateInfoURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/evaluateInfo/{id}'
  url = url.replace('{id}', parameters['id'])
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name CreateEvaluateInfo
 * @method post
 * @summary 创建评价信息
 * @description 创建评价信息
 * @param { Object } [body] body - 运动项目信息
 */
export const CreateEvaluateInfo = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/evaluateInfo'

  if (parameters['body'] !== undefined) {
    params.body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required Object parameter: body'))
  }
  return request('post', url, params, config)
}
/**
 * @name CreateEvaluateInfoURL
 */
export const CreateEvaluateInfoURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/evaluateInfo'
  // body body
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetEvaluateInfos
 * @method get
 * @summary 获取评价信息列表
 * @description 获取评价信息列表
 * @param { Integer } [query] skip - 翻过条目数
 * @param { Integer } [query] limit - 限制条目数
 * @param { String } [query] query - 筛选条件
 */
export const GetEvaluateInfos = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  url = '/v1/evaluateInfos'

  if (parameters['skip'] !== undefined) {
    params.querys['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    params.querys['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    params.querys['query'] = parameters['query']
  }
  return request('get', url, params, config)
}
/**
 * @name GetEvaluateInfosURL
 */
export const GetEvaluateInfosURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/evaluateInfos'
  querys['skip'] = parameters['skip']
  querys['limit'] = parameters['limit']
  querys['query'] = parameters['query']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name UploadFile
 * @method post
 * @summary 上传文件
 * @description 上传文件(小于16M)
 * @param { String } [query] path - 文件路径
 * @param { File } [formData] file - 文件流
 */
export const UploadFile = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'multipart/form-data'
  config.headers['Accept'] = 'application/json'
  url = '/v1/file/upload'
  params.body = new FormData()
  if (parameters['path'] !== undefined) {
    params.querys['path'] = parameters['path']
  }
  if (parameters['file'] !== undefined) {
    params.body.append('file', parameters['file'])
  }
  return request('post', url, params, config)
}
/**
 * @name UploadFileURL
 */
export const UploadFileURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/file/upload'
  querys['path'] = parameters['path']
  // formData file
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name GetClubFileZip
 * @method get
 * @summary 获取文件
 * @description 获取文件
 * @param { String } [query] club - 俱乐部名称
 */
export const GetClubFileZip = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/octet-stream'
  url = '/v1/file/download/zip'

  if (parameters['club'] !== undefined) {
    params.querys['club'] = parameters['club']
  }
  return request('get', url, params, config)
}
/**
 * @name GetClubFileZipURL
 */
export const GetClubFileZipURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/file/download/zip'
  querys['club'] = parameters['club']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

/**
 * @name DownloadFile
 * @method get
 * @summary 获取文件
 * @description 获取文件
 * @param { String } [query] id - 文件ID
 */
export const DownloadFile = (parameters = {}) => {
  const config = parameters.$config ? parameters.$config : {}
  let url = ''
  const params = { querys: {}, headers: {}, body: {}}
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/octet-stream'
  url = '/v1/file/download'

  if (parameters['id'] !== undefined) {
    params.querys['id'] = parameters['id']
  }
  return request('get', url, params, config)
}
/**
 * @name DownloadFileURL
 */
export const DownloadFileURL = (parameters = {}) => {
  let url = ''
  const querys = {}
  url = '/v1/file/download'
  querys['id'] = parameters['id']
  const keys = Object.keys(querys)
  return domain + url + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(querys[key])).join('&')) : '')
}

