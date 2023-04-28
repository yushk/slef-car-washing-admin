<template>
  <div class="login-index-container">
    <header class="title">
      <span>
        基于运动模式识别的运动技能教学评价系统
      </span>
    </header>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-index-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-index-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.phone"
          placeholder=""
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-index-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder=""
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
        <el-button :loading="loading" type="primary" style="margin-bottom:30px;" @click.native.prevent="handleLogin">登  录</el-button>
        <!--微信授权登录按钮-->
        <!-- <img src="@/assets/weixin.png" style="width:20px;height:20px" /><a style="line-height: 60px;height: 60px; margin: 0 5px;" type="text" @click="handLoginByWx">微信扫码登录</a> -->

      </div>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      //   callback(new Error('Please enter the correct user name'))
      // } else {
      //   }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      // if (value.length < 6) {
      //   callback(new Error('The password can not be less than 6 digits'))
      // } else {
      //   }
      callback()
    }
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password'
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
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-index-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-index-container {
  .title{
    margin-left: 50px;
    margin:2rem  0 0 2rem;
    font-size: 2rem;
    color: #fff;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    // color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-index-container {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../assets/bg.jpg');
    background-position: center center;
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  // background: url('../../assets/bg.png');
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 0;
    margin: 0 auto;
    margin-top: 160px ;
    overflow: hidden;
  background-color: #ffffff24;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-index-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-index-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
