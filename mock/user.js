
const tokens = {
  admin: {
    token: 'admin-token'
  },
  teacher: {
    token: 'teacher-token'
  },
  student: {
    token: 'student-token'
  },
  worker: {
    token: 'worker-token'
  }
}

const users = {
  'admin-token': {
    roles: ['root'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'admin'
  },
  'teacher-token': {
    roles: ['teacher'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'teacher'
  },
  'student-token': {
    roles: ['student'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'student'
  },
  'worker-token': {
    roles: ['worker'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'worker'
  }
}

module.exports = [
  // user login
  {
    url: '/api/login',
    type: 'post',
    response: config => {
      const { phone } = config.body
      const token = tokens[phone]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/api/user\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/api/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
