<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">欢迎登录朵云书店</h3>
      </div>

      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="手机号/用户名"
          name="phone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password" v-if="!isSmsLogin">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-form-item prop="smsCode" v-else>
        <el-row :gutter="20">
          <el-col :span="16">
            <span class="svg-container">
              <svg-icon icon-class="验证码"/>
            </span>
            <el-input
              ref="smsCode"
              v-model="loginForm.smsCode"
              placeholder="输入验证码"
              name="smsCode"
              type="text"
              tabindex="2"
              auto-complete="on"
            />
          </el-col>
          <el-col :span="8">
            <el-button class="sms-code-btn" type="primary" :disabled="countdownTime > 0" @click="sendSMSCode">
              {{ countdownTime > 0 ? countdownTime + 's 后重新获取' : '获取验证码' }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips-container">
        <div class="tips tips-left">
          <span><el-link href="#" class="register-text">立即注册</el-link></span>
        </div>
        <div class="tips tips-right">
          <span><a href="javascript:void(0);" @click="toggleLoginType">{{ isSmsLogin ? '密码登录' : '短信登录' }}</a></span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validPhone } from '@/utils/validate'
import { Message } from 'element-ui'
import { sendCode } from '@/api/user'
export default {
  name: 'Login',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入你的手机号'))
        // eslint-disable-next-line no-empty
      } else if (!validPhone(value)) {
        callback(new Error('手机格式错误'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不少于6位'))
      } else {
        callback()
      }
    }
    const validateSms = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('验证码是6位'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        phone: '13686869696',
        password: '123456',
        smsCode: ''
      },
      countdownTime: 0,
      isSmsLogin: false,
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        smsCode: [{ required: true, trigger: 'blur', validator: validateSms }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 获取验证码
    sendSMSCode() {
      this.startCountdown()
      console.log(this.loginForm.phone)
      sendCode(this.loginForm.phone).then(response => {
        Message.success('注意验证码的查收')
      })
    },
    startCountdown() {
      this.countdownTime = 60 // 重置倒计时时间为 60 秒
      const timer = setInterval(() => {
        this.countdownTime--
        if (this.countdownTime === 0) {
          clearInterval(timer) // 清除定时器
        }
      }, 1000)
    },
    toggleLoginType() {
      this.isSmsLogin = !this.isSmsLogin
      if (this.isSmsLogin) {
        this.loginForm.password = '' // Reset password field
      } else {
        this.loginForm.smsCode = '' // Reset SMS code field
      }
      this.$nextTick(() => {
        this.$refs.loginForm.clearValidate() // Clear form validation
      })
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
          this.loading = true
          if (this.isSmsLogin) {
            this.$store.dispatch('user/loginWithSMS', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
              Message.error('登录失败，验证码错误')
            })
          } else {
            this.$store.dispatch('user/loginWithPwd', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
              Message.error('登录失败,账号或密码错误')
            })
          }
        } else {
          Message.error('递交错误')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
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
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  display: flex;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background-image: url("../../assets/image/bg1.jpg");
  background-size: 100%;
  align-items: center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 30px 50px 10px;
    margin: 0 auto;
    overflow: hidden;
    background-color: #eeeeee;
    border-radius: 10px;
    opacity: 0.95;
  }

  .tips-container {
    display: flex;
    justify-content: space-between;
  }

  .tips {
    margin: 10px;
  }

  .tips-left {
    margin-right: auto;
  }

  .tips-right {
    margin-left: auto;
  }

  .register-text {
    color: red;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: black;
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
