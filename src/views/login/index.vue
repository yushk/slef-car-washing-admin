<template>
  <div class="login-index-container">
    <div class="container relative h-full py-2 mx-auto sm:px-10">

      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <header class="mt-24 text-3xl text-white">
            <span>
              大连市青少年体育俱乐部等级评定工作平台
            </span>
            <img alt="" :src="require('../../assets/login-box-bg.svg')" class="w-2/3 mt-32 -enter-x">
          </header>
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <transition name="fade-transform" mode="out-in">
            <el-form v-if="type==='login'" key="loginForm" ref="loginForm" :model="loginForm" :rules="loginRules" class="px-5 py-8 login-form" auto-complete="on" label-position="left">
              <div class="title-index-container">
                <h3 class="mb-4 title">登录</h3>
              </div>
              <el-form-item prop="username">
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="请输入帐号"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="请输入密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
              <div style="text-align:center">
                <el-button :loading="loading" type="primary" class="w-full mb-8" @click.native.prevent="handleLogin">登  录</el-button>
              <!--微信授权登录按钮-->
              <!-- <img src="@/assets/weixin.png" style="width:20px;height:20px" /><a style="line-height: 60px;height: 60px; margin: 0 5px;" type="text" @click="handLoginByWx">微信扫码登录</a> -->
              </div>
              <div class="flex flex-row justify-end tips">
                <el-button type="" class="mb-8 " @click="type='signup'">立即注册</el-button>
              </div>

            </el-form>
            <el-form v-else key="signupForm" ref="signupForm" :model="signupForm" :rules="signupRules" class="px-5 py-8 login-form" auto-complete="on" label-position="left">
              <div class="title-index-container">
                <h3 class="mb-4 title">注册</h3>
              </div>
              <el-form-item prop="role">
                <el-select
                  v-model="signupForm.role"
                  class="w-full"
                  placeholder="角色"
                >
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="username">
                <el-input
                  ref="username"
                  v-model="signupForm.username"
                  placeholder="帐号"
                  tabindex="1"
                />
              </el-form-item>
              <el-form-item prop="phone">
                <el-input
                  ref="phone"
                  v-model="signupForm.phone"
                  placeholder="手机号"
                  tabindex="1"
                />
              </el-form-item>

              <el-form-item prop="password">
                <el-input
                  ref="password"
                  v-model="signupForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  tabindex="2"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
              <el-form-item prop="repassword">
                <el-input
                  ref="password"
                  v-model="signupForm.repassword"
                  :type="passwordType"
                  placeholder="确认密码"
                  tabindex="2"
                  @keyup.enter.native="handleSignup"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>

              <div style="text-align:center">
                <el-button :loading="loading" type="primary" class="w-full mb-8" @click.native.prevent="handleSignup">注   册</el-button>
              <!--微信授权登录按钮-->
              <!-- <img src="@/assets/weixin.png" style="width:20px;height:20px" /><a style="line-height: 60px;height: 60px; margin: 0 5px;" type="text" @click="handLoginByWx">微信扫码登录</a> -->
              </div>
              <div class="flex flex-row justify-end tips">
                <el-button type="" class="mb-8 " @click="type='login'">返回</el-button>
              </div>

            </el-form>
          </transition>
        </div>
      </div>
    </div>

    <el-dialog
      title=""
      :visible.sync="showTable"
      center
      width="360px"
    >
      <slide-verify
        :l="42"
        :r="10"
        :w="310"
        :h="155"
        slider-text="向右滑动"
        :imgs="imgs"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
      />
      <div>{{ msg }}</div>
    </el-dialog>

  </div>
</template>

<script>

import { Test } from 'yxtx-lib'
export default {
  name: 'Login',
  components: {
  },
  data() {
    const validatephone = (rule, value, callback) => {
      if (Test.mobile(value)) {
        callback()
      } else {
        callback(new Error('Please enter the correct phone'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认密码'))
      }
      if (value !== this.signupForm.password) {
        callback(new Error('确认密码不一致'))
      } else {
        callback()
      }
    }
    return {
      type: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      signupForm: {
        role: 'club',
        phone: '',
        username: '',
        password: '',
        repassword: '',
        files: []
      },
      signupRules: {
        username: [{ required: true, trigger: 'blur' }],
        phone: [{ required: true, trigger: 'blur', validator: validatephone }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        repassword: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      msg: '',
      showTable: false,
      imgs: [
        require('@/assets/login/1.webp'),
        require('@/assets/login/3.webp'),
        require('@/assets/login/4.jpg'),
        require('@/assets/login/5.jpg'),
        require('@/assets/login/2.webp')
      ],
      roleOptions: [
        { label: '俱乐部', id: 'club' },
        { label: '专家组', id: 'teacher' },
        { label: '体育局', id: 'sport' }
      ]
    }
  },
  watch: {
    $route: {
      handler: function(route) {
      },
      immediate: true
    }
  },
  methods: {
    onSuccess() {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: '/' })
        this.showTable = false
      }).catch(() => {
        this.showTable = false
      })
      this.msg = 'login success'
    },
    onFail() {
      this.msg = 'please retry'
    },
    onRefresh() {
      this.msg = ''
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
          this.showTable = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSignup() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          // this.loading = true
          this.showTable = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handLoginByWx() {
      // 重定向地址重定到当前页面，在路径获取code
      const hrefUrl = window.location.href
      // 判断是否已存在code
      const APPID = 'wxaa6887ae42b3022a'
      // 不存在，配置相关微信登录参数（主要是授权页面地址，appID，回调地址）
      window.location.href = `
          	https://open.weixin.qq.com/connect/qrconnect
			?appid=${APPID}
			&redirect_uri=${encodeURIComponent(hrefUrl)}
			&response_type=code
			&scope=snsapi_login
					`
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#000;

.login-index-container {
  &::before{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('../../assets/login-bg.svg');
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: "";
  }

  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 0;
    margin: 0 auto;
    margin-top: 160px ;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-index-container {
    position: relative;

    .title {
      font-size: 28px;
      color: $light_gray;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
